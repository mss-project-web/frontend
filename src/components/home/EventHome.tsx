"use client";

import React from "react";
import Link from "next/link";
import { useFavoriteActivities } from "@/lib/hooks/activities/useActivitiesFavorite";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const SkeletonCard = () => (
      <Card className="border-none rounded-lg">
            <Skeleton className="w-full h-40 rounded-t-lg bg-gray-200" />
            <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4 bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-5/6 bg-gray-200" />
            </CardContent>
      </Card>
);

export function EventHome() {
      const {
            activities,
            loading: activitiesLoading,
            error: activitiesError,
      } = useFavoriteActivities();

      let content;

      if (activitiesError) {
            content = Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonCard key={index} />
            ));
      } else if (activitiesLoading) {
            content = Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonCard key={index} />
            ));
      } else if (activities.length === 0) {
            content = (
                  <div className="col-span-3 text-center text-gray-500">
                        ไม่พบกิจกรรมที่แนะนำในขณะนี้
                  </div>
            );
      } else {
            content = activities.map((event) => (
                  <Link
                        key={event._id}
                        href={`/activities/${event._id}`}
                        className="block"
                        aria-label={`ดูรายละเอียดกิจกรรม ${event.name_th}`}
                  >
                        <Card className="h-full bg-white/95 backdrop-blur-sm border border-blue-100/50 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-lg">
                              <Image
                                    src={event.images?.[0] || "/fallback.jpg"}
                                    alt={event.name_th}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                    width={800}
                                    height={300}
                              />
                              <CardContent className="p-4 flex-grow flex flex-col">
                                    <div className="flex items-center space-x-4 mb-3">
                                          <div className="text-xl font-semibold text-gray-800">
                                                {event.name_th}
                                          </div>
                                    </div>
                                    <div className="text-sm text-gray-600 line-clamp-2">
                                          {event.description}
                                    </div>
                              </CardContent>
                        </Card>
                  </Link>
            ));
      }

      return (
            <section className="max-w-7xl mx-auto py-6">
                  <h2 className="text-2xl font-extrabold text-blue-800 mb-8 border-b-2 border-gray-300 inline-block pb-1">
                        กิจกรรมดีเด่น
                  </h2>
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
                        {content}
                  </div>

                  <div className="flex justify-end mt-6">
                        <Link href="/activities">
                              <div className="py-3 text-sx text-left text-gray-800 border-b-2 border-gray-300 inline-block pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors duration-300 cursor-pointer">
                                    กิจกรรมทั้งหมด
                              </div>
                        </Link>
                  </div>
            </section>
      );
}

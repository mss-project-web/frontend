"use client";

import React from "react";
import Link from "next/link";
import { useFavoriteActivities } from "@/hooks/activities/useActivitiesFavorite";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

import { ActivityCard } from "@/components/activities/ActivityCard";

const SkeletonCard = () => <ActivityCard isLoading={true} />;

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
      <ActivityCard key={event._id} activity={event} isLoading={false} />
    ));
  }

  return (
    <section className="max-w-7xl mx-auto py-6">
      <h2 className="text-2xl font-extrabold text-blue-800 mb-8 border-b-2 border-gray-300 inline-block pb-1">
        กิจกรรมดีเด่น
      </h2>
      <div
        className={`grid gap-3 sm:gap-4 md:gap-6 ${
          activitiesLoading || activitiesError
            ? "grid-cols-2 lg:grid-cols-4"
            : activities.length === 1
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-2 lg:grid-cols-4"
        }`}
      >
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

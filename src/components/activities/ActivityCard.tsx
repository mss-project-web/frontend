import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Activity } from '@/types/activities';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Clock, MapPin, Users } from 'lucide-react';

interface ActivityCardProps {
      activity?: Activity & { imageUrl?: string; name?: string };
      isLoading: boolean;
}

export function ActivityCard({ activity, isLoading }: ActivityCardProps) {
      if (isLoading) {
            return (
                  <Card className="border-none shadow-md">
                        <div className="relative h-48 rounded-t-lg overflow-hidden bg-gray-200 animate-pulse">
                              <Skeleton className="w-full h-full rounded-t-lg" />
                              <div className="absolute top-3 left-3 bg-gray-200">
                                    <Skeleton className="h-6 w-32 rounded-full" />
                              </div>
                        </div>
                        <CardContent className="p-5">
                              <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
                              <div className="flex items-center space-x-2 text-gray-600 mb-3 text-sm bg-gray-200">
                                    <Skeleton className="h-4 w-24" />
                              </div>
                              <Skeleton className="h-10 w-full mb-3 bg-gray-200" />
                        </CardContent>
                  </Card>
            );
      }

      if (!activity) {
            return null;
      }

      const imageUrl = Array.isArray(activity.images)
            ? activity.images[0]
            : activity.images || "/fallback.jpg";

      return (
            <Link
                  key={activity._id}
                  href={`/activities/${activity._id}`}
                  className="block group"
                  aria-label={`ดูรายละเอียดกิจกรรม ${activity.name_th}`}
            >
                  <Card className="h-full bg-white/95 backdrop-blur-sm border border-blue-100/50 shadow-lg group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden cursor-pointer">
                        <div className="relative overflow-hidden aspect-square"> 
                              <Image
                                    src={imageUrl}
                                    alt={activity.name_th || "กิจกรรม"}
                                    width={500} 
                                    height={500}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    {activity.name_th}
                              </div>
                        </div>

                        <CardContent className="p-6 flex-grow flex flex-col">
                              <div className="flex items-center space-x-4 mb-2">
                                    <div className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                          {activity.name_th}
                                    </div>
                              </div>
                              <div className="text-sm text-gray-600 line-clamp-2">
                                    {activity.description}
                              </div>
                        </CardContent>
                  </Card>
            </Link>
      );
}
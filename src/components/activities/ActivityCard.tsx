import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "@/types/activities";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface ActivityCardProps {
  activity?: Activity & { imageUrl?: string; name?: string };
  isLoading: boolean;
}

export function ActivityCard({ activity, isLoading }: ActivityCardProps) {
  if (isLoading) {
    return (
      <Card className="border-none shadow-md overflow-hidden rounded-xl h-full flex flex-col">
        <div className="relative aspect-[4/3] w-full bg-gray-200 animate-pulse shrink-0">
          <Skeleton className="w-full h-full" />
          <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/50 backdrop-blur-sm rounded-full w-16 h-5"></div>
        </div>
        <CardContent className="p-3 md:p-5 flex-grow flex flex-col justify-between bg-white">
          <div>
            <Skeleton className="h-4 md:h-5 w-[90%] mb-2 md:mb-3 bg-gray-200" />
            <Skeleton className="h-4 md:h-5 w-[60%] mb-3 md:mb-4 bg-gray-200" />
          </div>
          <Skeleton className="h-3 md:h-4 w-full mb-1.5 bg-gray-200" />
          <Skeleton className="h-3 md:h-4 w-[80%] bg-gray-200" />
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
      href={`/activities/${activity.slug || activity._id}`}
      className="block group"
      aria-label={`ดูรายละเอียดกิจกรรม ${activity.name_th}`}
    >
      <Card className="h-full bg-white/95 backdrop-blur-sm border border-blue-100/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden cursor-pointer flex flex-col group">
        <div className="relative overflow-hidden aspect-[4/3] w-full shrink-0 bg-gray-100">
          <Image
            src={imageUrl}
            alt={activity.name_th || "กิจกรรม"}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] md:text-xs font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-sm border border-white/20 z-10">
            {activity.name_eng}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <CardContent className="p-3.5 md:p-6 flex-grow flex flex-col justify-start bg-white">
          <div className="mb-1.5 md:mb-3">
            <h3 className="text-[14px] sm:text-base md:text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-snug md:leading-tight">
              {activity.name_th}
            </h3>
          </div>
          <div className="text-[12px] sm:text-[13px] md:text-sm text-gray-500 md:text-gray-600 line-clamp-2 md:line-clamp-3 leading-relaxed">
            {activity.description}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

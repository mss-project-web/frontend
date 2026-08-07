import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function PrayerRoomDetailLoading() {
  return (
    <main className="min-h-screen bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl animate-pulse">
        {/* Navigation */}
        <div className="mb-8">
          <div className="inline-flex items-center text-sm font-medium text-gray-300">
            <ArrowLeft className="w-4 h-4 mr-2" /> กลับไปหน้าแผนที่
          </div>
        </div>
        
        {/* Header Section */}
        <div className="mb-8">
          <Skeleton className="h-10 md:h-12 w-3/4 max-w-[400px] mb-4 bg-gray-200 rounded-lg" />
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <Skeleton className="h-6 w-48 bg-gray-200 rounded-md" />
            <Skeleton className="h-10 w-28 bg-gray-200 rounded-md" />
          </div>
        </div>

        {/* Hero Image & Gallery */}
        <div className="mb-12 space-y-3">
           <Skeleton className="relative aspect-[4/3] md:aspect-[16/9] w-full rounded-2xl bg-gray-200" />
           <div className="flex gap-3 pb-2">
             <Skeleton className="h-24 w-32 md:h-32 md:w-44 rounded-xl shrink-0 bg-gray-200" />
             <Skeleton className="h-24 w-32 md:h-32 md:w-44 rounded-xl shrink-0 bg-gray-200" />
             <Skeleton className="h-24 w-32 md:h-32 md:w-44 rounded-xl shrink-0 bg-gray-200" />
           </div>
        </div>

        {/* Content Section */}
        <div className="space-y-12 pb-20">
          
          <section>
            <Skeleton className="h-7 w-32 bg-gray-200 rounded-md mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full bg-gray-200 rounded-md" />
              <Skeleton className="h-5 w-full bg-gray-200 rounded-md" />
              <Skeleton className="h-5 w-3/4 bg-gray-200 rounded-md" />
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-3">
              <Skeleton className="w-5 h-5 rounded-full bg-gray-200 shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 bg-gray-200 rounded-sm" />
                <Skeleton className="h-5 w-20 bg-gray-200 rounded-sm" />
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Skeleton className="w-5 h-5 rounded-full bg-gray-200 shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-gray-200 rounded-sm" />
                <Skeleton className="h-5 w-32 bg-gray-200 rounded-sm" />
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Skeleton className="w-5 h-5 rounded-full bg-gray-200 shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-12 bg-gray-200 rounded-sm" />
                <Skeleton className="h-5 w-28 bg-gray-200 rounded-sm" />
              </div>
            </div>
          </div>

          <section>
            <Skeleton className="h-7 w-40 bg-gray-200 rounded-md mb-4" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-24 rounded-full bg-gray-200" />
              <Skeleton className="h-9 w-32 rounded-full bg-gray-200" />
              <Skeleton className="h-9 w-20 rounded-full bg-gray-200" />
            </div>
          </section>

          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
             <Skeleton className="flex-1 h-14 rounded-xl bg-gray-200" />
             <Skeleton className="flex-1 h-14 rounded-xl bg-gray-200" />
          </div>

        </div>
      </div>
    </main>
  );
}

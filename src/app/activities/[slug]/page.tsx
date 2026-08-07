import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Target, CheckCircle, MessageSquare, MapPin, Users, Clock } from "lucide-react";
import ActivityGallery from "@/components/activities/ActivityGallery";
import StructuredData from "@/components/StructuredData";
import { API_URL } from "@/config";

const baseUrl = "https://msspsuhatyai.org";

type Activity = {
  _id: string;
  slug?: string;
  name_th: string;
  name_eng: string;
  location?: string;
  participants?: number;
  duration?: number;
  description?: string;
  images?: string[];
  objectives?: string[];
  goals?: string[];
  feedbacks?: string[];
  start_date?: string | null;
  end_date?: string | null;
};

// Rebuild static pages every 5 minutes (fast + fresh enough for SEO).
export const revalidate = 300;

async function getActivity(slug: string): Promise<Activity | null> {
  try {
    const res = await fetch(`${API_URL}/activities/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data?.data ?? json?.data) as Activity | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getActivity(slug);
  if (!activity) return { title: "กิจกรรม | ชมรมมุสลิม ม.อ.หาดใหญ่" };

  const title = `${activity.name_th} | ชมรมมุสลิม ม.อ.หาดใหญ่`;
  const description = (
    activity.description ||
    `กิจกรรม ${activity.name_th} ของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่`
  ).slice(0, 160);
  const url = `${baseUrl}/activities/${activity.slug || slug}`;
  const image = activity.images?.[0];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", images: image ? [{ url: image }] : undefined },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = await getActivity(slug);
  if (!activity) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <StructuredData
        type="event"
        data={{
          name: activity.name_th,
          description: activity.description || "กิจกรรมชมรมมุสลิม ม.อ.หาดใหญ่",
          startDate: activity.start_date,
          endDate: activity.end_date,
          location: activity.location || "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
          image: activity.images?.[0] || "/Image/1.webp",
          url: `${baseUrl}/activities/${activity.slug || slug}`,
        }}
      />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center py-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{activity.name_th}</h1>
            <div className="text-lg md:text-xl opacity-90">{activity.name_eng}</div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Quick Info Bar */}
            <div className="flex justify-center items-center py-8">
              <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-4">
                  <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left bg-white/60 rounded-lg p-4 shadow-md border border-gray-100">
                    <MapPin className="text-blue-600 mb-2" size={28} />
                    <div>
                      <h2 className="font-semibold text-gray-800 text-base sm:text-lg">สถานที่จัดกิจกรรม</h2>
                      <p className="text-gray-600 text-sm sm:text-base">{activity.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left bg-white/60 rounded-lg p-4 shadow-md border border-gray-100">
                    <Users className="text-green-600 mb-2" size={28} />
                    <div>
                      <h2 className="font-semibold text-gray-800 text-base sm:text-lg">จำนวนผู้เข้าร่วม</h2>
                      <p className="text-gray-600 text-sm sm:text-base">{activity.participants} คน</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left bg-white/60 rounded-lg p-4 shadow-md border border-gray-100">
                    <Clock className="text-purple-600 mb-2" size={28} />
                    <div>
                      <h2 className="font-semibold text-gray-800 text-base sm:text-lg">ระยะเวลา</h2>
                      <p className="text-gray-600 text-sm sm:text-base">{activity.duration} ชั่วโมง</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3">รายละเอียดกิจกรรม</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">{activity.description}</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3">ภาพกิจกรรม</h2>
                  <ActivityGallery images={activity.images || []} />
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3 flex items-center space-x-3">
                    <Target className="text-blue-600" size={28} />
                    <span>วัตถุประสงค์</span>
                  </h2>
                  <div className="space-y-4">
                    {activity.objectives && activity.objectives.length > 0 ? (
                      activity.objectives.map((objective, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 font-semibold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 leading-relaxed text-lg pt-1">{objective}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">ไม่มีข้อมูลวัตถุประสงค์</p>
                    )}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3 flex items-center space-x-3">
                    <CheckCircle className="text-green-600" size={28} />
                    <span>เป้าหมาย</span>
                  </h2>
                  <div className="space-y-4">
                    {activity.goals && activity.goals.length > 0 ? (
                      activity.goals.map((goal, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                          <p className="text-gray-700 leading-relaxed text-lg">{goal}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">ไม่มีข้อมูลเป้าหมาย</p>
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">ข้อมูลสรุป</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">จำนวนผู้เข้าร่วม:</span>
                      <span className="font-semibold text-black">{activity.participants} คน</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ระยะเวลา:</span>
                      <span className="font-semibold text-black">{activity.duration} ชั่วโมง</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                    <MessageSquare className="text-purple-600" size={24} />
                    <span>ความคิดเห็นผู้เข้าร่วม</span>
                  </h2>
                  <div className="space-y-6">
                    {activity.feedbacks && activity.feedbacks.length > 0 ? (
                      activity.feedbacks.map((feedback, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                          <p className="text-gray-700 leading-relaxed">{feedback}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">ยังไม่มีความคิดเห็น</p>
                    )}
                  </div>
                </section>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/activities" className="inline-flex items-center px-5 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors font-medium">
                ดูกิจกรรมทั้งหมด
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

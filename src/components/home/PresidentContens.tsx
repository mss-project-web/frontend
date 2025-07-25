import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const reviews = [
      {
            name: "นิอันวา แวกาจิ",
            position: "ประธานชมรม รุ่น 47",
            description: "ในฐานะประธานชมรม ขอให้ความมั่นใจว่าเราพร้อมสนับสนุนและให้บริการที่ดีที่สุดแก่สมาชิกทุกท่าน ด้วยความตั้งใจจริงและเอาใจใส่อย่างละเอียด",
      },
      {
            name: "ประธานชมรมศิษย์เก่า รุ่น 40",
            position: "ประธานบริหาร",
            description: "เราต้องการสร้างชุมชนที่แข็งแกร่ง เชื่อมโยงน้องพี่ให้อยู่ร่วมกันอย่างมีความสุข และร่วมพัฒนาองค์กรของเราไปสู่อนาคตที่สดใส",
      },
      {
            name: "รองประธานฝ่ายกิจกรรม",
            position: "รองประธาน",
            description: "ด้วยประสบการณ์และความเชี่ยวชาญ เราจะนำพาองค์กรไปสู่ความเป็นเลิศ และสร้างคุณค่าที่ยั่งยืนให้กับทุกคน",
      },
      {
            name: "เลขานุการชมรม",
            position: "เลขาธิการ",
            description: "การบริการที่เป็นเลิศคือสิ่งที่เรามุ่งมั่น เราจะดูแลและให้ความสำคัญกับทุกรายละเอียด เพื่อประสบการณ์ที่ดีที่สุด",
      },
      {
            name: "ประธานฝ่ายประชาสัมพันธ์",
            position: "หัวหน้าฝ่าย",
            description: "ความไว้วางใจของสมาชิกคือสิ่งสำคัญที่สุด เราจะทำงานด้วยความซื่อสัตย์ โปร่งใส และเอาใจใส่ในทุกกิจกรรม",
      },
      {
            name: "อดีตประธานชมรม",
            position: "ที่ปรึกษา",
            description: "จากประสบการณ์หลายปีในการบริหารชมรม เราภูมิใจในมาตรฐานที่สูงและการพัฒนาอย่างต่อเนื่องที่เราได้สร้างขึ้น",
      },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
      name,
      position,
      description,
}: {
      name: string;
      position: string;
      description: string;
}) => {
      return (
            <figure
                  className={cn(
                        "relative h-full w-64 sm:w-80 cursor-pointer overflow-hidden rounded-xl border p-4 sm:p-6 mx-1 sm:mx-2 transition-all duration-300 hover:scale-105 group",
                        "border-blue-100 bg-white hover:bg-blue-50/20 shadow-sm hover:shadow-md hover:border-blue-200"
                  )}
            >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-l-xl opacity-70"></div>

                  <div className="flex flex-col mb-3 sm:mb-4 pl-2 sm:pl-3">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                                    {position}
                              </span>
                        </div>
                        <figcaption className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                              {name}
                        </figcaption>
                  </div>

                  <blockquote className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal pl-2 sm:pl-3 relative">
                        <div className="absolute left-0 top-0 text-lg sm:text-2xl text-blue-300 font-serif leading-none">"</div>
                        <div className="pl-3 sm:pl-4 pr-2">
                              {description}
                        </div>
                        <div className="absolute right-0 bottom-0 text-lg sm:text-2xl text-blue-300 font-serif leading-none">"</div>
                  </blockquote>
            </figure>
      );
};

export function PresidentContens() {
      return (
            <div className="bg-gradient-to-b from-white via-slate-50/50 to-white">
                  <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                        <Marquee pauseOnHover className="[--duration:30s]">
                              {firstRow.map((review, index) => (
                                    <ReviewCard key={`first-${index}`} {...review} />
                              ))}
                        </Marquee>
                        <Marquee reverse pauseOnHover className="[--duration:30s]">
                              {secondRow.map((review, index) => (
                                    <ReviewCard key={`second-${index}`} {...review} />
                              ))}
                        </Marquee>

                        {/* Enhanced fade gradients */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10"></div>
                  </div>

                  <div className="text-center mt-12">
                        <div className="inline-block w-24 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 opacity-60"></div>
                  </div>
            </div>
      );
}
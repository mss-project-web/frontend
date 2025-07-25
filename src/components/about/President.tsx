"use client";

const presidents = [
  { name: "นายอสิ มะหะมัดยังกี", faculty: "คณะแพทยศาสตร์", year: "พ.ศ.2521" },
  { name: "นายแวดือราแม แวดาโอะ", faculty: "คณะแพทยศาสตร์", year: "พ.ศ.2522" },
  { name: "นายชัยรัตน์ ศิริพัธนะ", faculty: "คณะทรัพยากรธรรมชาติ", year: "พ.ศ.2523" },
  { name: "นายอิสมาแอ ระนี", faculty: "คณะวิทยาการจัดการ", year: "พ.ศ.2524" },
  { name: "นายอาแว มะแส", faculty: "คณะทรัพยากรธรรมชาติ", year: "พ.ศ.2525" },
  { name: "นายเส็น แสงอารีย์", faculty: "คณะวิทยาการจัดการ", year: "พ.ศ.2526" },
  { name: "นายอับดุลนาเซร์ หะยีสาเมาะ", faculty: "คณะวิทยาศาสตร์", year: "พ.ศ.2527" },
  { name: "นายสะการิยา ปูติ", faculty: "คณะเภสัชศาสตร์", year: "พ.ศ.2528" },
  { name: "นายกูยิ ยามีรูเด็ง", faculty: "คณะวิทยาการจัดการ", year: "พ.ศ.2529" },
  { name: "นายสุไลมาน หะยียามา", faculty: "คณะวิทยาการจัดการ", year: "พ.ศ.2530" },
  { name: "นายอิบรอฮีม เจ๊ะอาลี", faculty: "คณะวิศวกรรมศาสตร์", year: "พ.ศ.2531" },
  { name: "นายหมัดอาหมีน หมันหลิน", faculty: "คณะวิทยาศาสตร์", year: "พ.ศ.2532" },
  { name: "นายอับดุลรอณี แหละดุหวี", faculty: "คณะวิทยาการจัดการ", year: "พ.ศ.2532" },
  { name: "นายมิตร เจ๊ะยอ", faculty: "คณะวิศวกรรมศาสตร์", year: "พ.ศ.2533" },
  { name: "นายกอเดร์ คาเร็ง", faculty: "คณะเภสัชศาสตร์", year: "พ.ศ.2533" },
  { name: "นายแวยูโซ๊ะ (ยูสุฟ) นิมะ", faculty: "คณะเภสัชศาสตร์", year: "พ.ศ.2534" },
  { name: "นายอาหมัด มามุ", faculty: "คณะวิศวกรรมศาสตร์", year: "พ.ศ.2535" },
  { name: "นายวิเชียร หญ้าปรัง", faculty: "คณะทรัพยากรธรรมชาติ", year: "พ.ศ.2536" },
  { name: "นายอุสมาน อายิ", faculty: "คณะวิทยาการจัดการ", year: "พ.ศ.2537" },
  { name: "นายอิมรอน สะมานิ", faculty: "คณะวิศวกรรมศาสตร์", year: "พ.ศ.2538" },
  { name: "นายสมาน ปะกียา", faculty: "คณะวิทยาการจัดการ", year: "พ.ศ.2539" },
  { name: "นายไพรวัลย์ โต๊ะดำ", faculty: "คณะทรัพยากรธรรมชาติ", year: "พ.ศ.2540" },
  { name: "นายอรัญ รอกา", faculty: "คณะแพทยศาสตร์", year: "พ.ศ.2541" },
  { name: "นายอุสมาน สะรอ", faculty: "คณะวิทยาศาสตร์", year: "พ.ศ.2542" },
  { name: "นายจริยวัตร เจริญช่าง", faculty: "คณะวิศวกรรมศาสตร์", year: "พ.ศ.2543" },
  { name: "นายฮัมดี เจ๊ะอารน", faculty: "คณะวิศวกรรมศาสตร์", year: "พ.ศ.2544" },
  { name: "นายสุริยา ชูเกื้อ", faculty: "คณะวิศวกรรมศาสตร์", year: "พ.ศ.2545" }
];

export function President() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="mx-auto max-w-screen-xl px-4 relative z-10">
        <h2 className="text-2xl font-bold text-center text-black mb-10">
          ทำเนียบประธานชมรมมุสลิม
        </h2>

        <div className="overflow-y-auto max-h-100 shadow-lg bg-white/70 backdrop-blur-md">
          <table className="min-w-full text-sm text-blue-900">
            <thead>
              <tr className="bg-blue-100 text-left text-xs sm:text-sm uppercase tracking-wider sticky top-0 z-10">
                <th className="px-6 py-4">ลำดับ</th>
                <th className="px-6 py-4">ชื่อ-สกุล</th>
                <th className="px-6 py-4">คณะ</th>
                <th className="px-6 py-4">ปีการศึกษา</th>
              </tr>
            </thead>
            <tbody>
              {presidents.map((pres, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white/80" : "bg-blue-50/50"
                    } hover:bg-blue-200/40 transition`}
                >
                  <td className="px-6 py-4 font-semibold">{index + 1}</td>
                  <td className="px-6 py-4">{pres.name}</td>
                  <td className="px-6 py-4">{pres.faculty}</td>
                  <td className="px-6 py-4">{pres.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

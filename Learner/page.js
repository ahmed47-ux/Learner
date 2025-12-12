
export default function Home(){
  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold">تعلم لغات بطريقة ممتعة — التركيز على الإنجليزية</h2>
        <p className="mt-2">دورات: الصينية - الفرنسية - الألمانية - الإنجليزية - العربية - الروسية - الإيطالية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">ميزات</h3>
          <ul className="list-disc pr-6">
            <li>أسئلة ومسابقات تُفتح كل أسبوع.</li>
            <li>مراسلات ومكالمات (مفتوحة أسبوع ثم بالاشتراك).</li>
            <li>محادثة مع ذكاء اصطناعي لتحسين النطق.</li>
          </ul>
        </div>
        <aside className="bg-white p-6 rounded shadow">
          <h4 className="font-semibold">اشتراك</h4>
          <p className="mt-2">اشتراك 15$ كل شهرين (تجريبي).</p>
        </aside>
      </div>
    </section>
  )
}

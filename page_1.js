
export default function Training(){
  const langs = ['الإنجليزية','الصينية','الفرنسية','الألمانية','العربية','الروسية','الإيطالية'];
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">التدريب</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {langs.map(l=> (
          <div key={l} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{l}</h3>
            <p className="mt-2">دورة تجريبية ومحتوى نموذجي</p>
            <a href={`/training/${encodeURIComponent(l)}`} className="inline-block mt-3 px-3 py-1 bg-sky-100 rounded">افتح الدورة</a>
          </div>
        ))}
      </div>
    </section>
  )
}

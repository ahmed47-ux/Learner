
export default function LangCourse({ params }){
  const lang = decodeURIComponent(params.lang);
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold">دورة: {lang}</h2>
      <p className="mt-2">محتوى تجريبي - أسئلة الأسبوع</p>
      <ol className="list-decimal mt-4 pr-6">
        <li>سؤال تجريبي 1</li>
        <li>سؤال تجريبي 2</li>
        <li>سؤال تجريبي 3</li>
      </ol>
    </div>
  )
}

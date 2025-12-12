
import './globals.css'

export const metadata = {
  title: 'LingoBox',
  description: 'منصة تعلم لغات - LingoBox'
}

export default function RootLayout({ children }){
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-slate-50 text-slate-900">
        <header className="p-4 border-b bg-white sticky top-0 z-20">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">LingoBox</h1>
            <nav className="flex gap-3">
              <a href="/" className="px-3 py-1 rounded bg-slate-100">الرئيسية</a>
              <a href="/training" className="px-3 py-1 rounded bg-slate-100">التدريب</a>
              <a href="/messages" className="px-3 py-1 rounded bg-slate-100">مراسلات</a>
              <a href="/chat-ai" className="px-3 py-1 rounded bg-slate-100">محادثة ذكية</a>
              <a href="/profile" className="px-3 py-1 rounded bg-slate-100">بروفايل</a>
              <a href="/login" className="px-3 py-1 rounded bg-slate-100">تسجيل / دخول</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}

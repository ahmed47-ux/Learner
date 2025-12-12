
'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Login(){
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if(error) setMsg(error.message); else setMsg('تم إرسال رابط الدخول إلى الإيميل (محاكاة)')
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="text-lg font-bold">تسجيل / دخول</h2>
      <p className="mt-2">أدخل إيميلك لتسجيل الدخول (يستخدم Supabase Magic Link).</p>
      <input className="mt-3 p-2 border rounded w-full" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" />
      <button onClick={signIn} className="mt-3 px-4 py-2 bg-sky-500 text-white rounded">أرسل</button>
      <p className="mt-2 text-sm text-slate-600">{msg}</p>
    </div>
  )
}

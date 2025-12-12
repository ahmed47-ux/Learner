
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Profile(){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    supabase.auth.getUser().then(r=> setUser(r.data.user))
    supabase.auth.onAuthStateChange((_, session)=>{
      supabase.auth.getUser().then(r=> setUser(r.data.user))
    })
  },[])

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl">
      <h2 className="text-lg font-bold">الملف الشخصي</h2>
      {user ? (
        <div className="mt-4">
          <p>الاسم: {user.email}</p>
          <button className="mt-3 px-3 py-1 bg-red-100 rounded" onClick={()=> supabase.auth.signOut().then(()=> window.location.reload())}>تسجيل خروج</button>
        </div>
      ) : (
        <p className="mt-4">غير مسجل — اذهب إلى صفحة تسجيل الدخول</p>
      )}
    </div>
  )
}

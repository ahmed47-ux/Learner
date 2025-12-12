
'use client'
import { useState } from 'react'

export default function Messages(){
  const [messages, setMessages] = useState([{id:1, text:'مرحبا من مستخدم آخر'}])
  const [text, setText] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const send = ()=>{
    if(!text) return
    setMessages(prev=> [...prev, {id:Date.now(), text}])
    setText('')
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold">مراسلات ومكالمات</h2>
      {!subscribed && <p className="mt-2 text-sm text-slate-600">هذه الميزة تعمل لمدة أسبوع تجريبي (محاكاة). لتفعيلها اشترك.</p>}
      <div className="mt-4 space-y-2">
        {messages.map(m=> <div key={m.id} className="p-2 bg-slate-100 rounded">{m.text}</div>)}
      </div>
      <div className="mt-4 flex gap-2">
        <input className="flex-1 p-2 border rounded" value={text} onChange={e=>setText(e.target.value)} placeholder="اكتب رسالة..." />
        <button onClick={send} className="px-3 py-1 bg-sky-500 text-white rounded">إرسال</button>
      </div>
    </div>
  )
}

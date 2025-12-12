
'use client'
import { useState } from 'react'

export default function AIChat(){
  const [logs, setLogs] = useState([])
  const [text, setText] = useState('')

  const send = async ()=>{
    if(!text) return
    setLogs(p=> [...p, {who:'you', text}])
    setText('')
    const res = await fetch('/api/ai', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ prompt: text }) })
    const data = await res.json()
    setLogs(p=> [...p, {who:'ai', text: data.reply}])
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold">محادثة مع الذكاء الاصطناعي</h2>
      <div className="mt-4 space-y-2 h-64 overflow-auto p-2 bg-slate-50 rounded">
        {logs.map((l,i)=> <div key={i} className={l.who==='you' ? 'text-right':'text-left'}>{l.text}</div>)}
      </div>
      <div className="mt-4 flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="اكتب أو تحدث..." />
        <button onClick={send} className="px-3 py-1 bg-sky-500 text-white rounded">أرسل</button>
      </div>
    </div>
  )
}


import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req){
  try{
    const body = await req.json()
    const prompt = body.prompt || 'Hello'
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300
    })
    const reply = completion.choices?.[0]?.message?.content || 'No reply'
    return NextResponse.json({ reply })
  }catch(e){
    return NextResponse.json({ error: String(e), reply: 'خطأ في الاتصال' }, { status: 500 })
  }
}

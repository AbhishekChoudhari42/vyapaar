"use client"
import Image from 'next/image'
import redisClient from '@/lib/initRedis'
import axios from 'axios'

export default function Home() {
  const setFoo = async () => {
    const res = await axios.post('http://localhost:3000/api/redistest',{key:'roomid',value:{user:'sdsfs'}})
    console.log(res)
  }

  return (
    <main className="min-h-screen">
        <button onClick={setFoo}>setfoo</button>
        
    </main>
  )
}

"use client"
import Image from 'next/image'
import axios from 'axios'

export default function Home() {
  const setFoo = async () => {
    console.log(res)
  }

  return (
    <main className="min-h-screen">
        <button onClick={setFoo}>setfoo</button>
    </main>
  )
}

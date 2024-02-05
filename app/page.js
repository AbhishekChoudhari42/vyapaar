"use client"

import useUser from '@/hooks/useUser'
import React from 'react'
import Image from 'next/image'
const page = () => {

  const user = useUser();
  
  console.log(user.isError)

  return (
    <div className='w-screen h-screen '>
      <nav className='w-full bg-neutral-900 px-4 py-2 flex justify-between'>
        <h2 className='font-bold'>
          Vyapaar
        </h2>
        <div className='flex gap-2 items-center'>
          {user?.data?.image_url ? 
            <Image className='rounded-full' width={40} height={40} src={user?.data?.image_url} />
            :<div className='w-[40px] h-[40px] rounded-full bg-slate-800'></div>
          }
        </div>
      </nav>

    </div>
  )
}

export default page
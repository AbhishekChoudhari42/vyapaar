"use client"
import React, { useEffect, useState } from 'react'
import useStore from '@/store/store'
import { useRouter } from 'next/navigation'

const page = () => {

    const { setUser , user} = useStore()
    const [userValue, setUserValue] = useState('')

    const router = useRouter();

    const login = (e) => {
      e.preventDefault()

      localStorage.setItem('user',userValue)
      setUser(userValue)
      router.push('/room',{shallow:true})
    }

    useEffect(() => {
        if(user){
            router.push('/room')
        }
    }, [])

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>
            <form className='flex flex-col gap-2 w-[350px]'>
                <h2 className='text-lg font-semibold'> Login </h2>
                <input className = "input-style" type='text'  value={userValue} onChange={(e) => setUserValue(e.target.value)} />
                <button className = 'white-button' onClick={(e) => { login(e) }}>Login</button>
            </form>
        </div>
    )
}

export default page
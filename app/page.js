"use client"
import useUser from '@/hooks/useUser'
import React from 'react'

const page = () => {
  
  const {isFetching,data} = useUser();
  // console.log(data)
  return (
    <div>home</div>
  )
}

export default page
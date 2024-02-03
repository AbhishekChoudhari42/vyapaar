"use client"
import useUser from '@/hooks/useUser'
import React from 'react'

const page = () => {
  
  const {isFetching,data} = useUser();

  return (
    <div>home</div>
  )
}

export default page
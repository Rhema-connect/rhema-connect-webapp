"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface Props {}

function Dashboard(props: Props) {
    const {} = props

    const router = useRouter()
  
    useEffect(()=> {
      router?.push("/dashboard/resources")
    }, [])

    return (
        <div className=' w-full h-full ' >
            <div className=' w-full flex bg-white px-2 flex-col ' >
                <p className=' font-bold text-[24px] leading-[36px] text-black ' >Resource</p>
            </div>
        </div>
    )
}

export default Dashboard

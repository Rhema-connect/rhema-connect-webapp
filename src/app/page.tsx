"use client"
import HomeComponent from '@/components/homecomponent'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {

  const router = useRouter()
  const pathname = usePathname()

  useEffect(()=>{
    router.push("/home")
  }, [pathname])

  return (
    <div className=' fixed inset-0 w-full h-full flex justify-center items-center z-50 bg-[#3B3B3B] ' >
      <img className=' w-[300px] animate-pulse ' src='/images/logo.svg' alt='logo' />
    </div>
  )
}

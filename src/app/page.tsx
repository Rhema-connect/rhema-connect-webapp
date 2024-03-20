"use client"
import HomeComponent from '@/components/homecomponent'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    router.push("/home")
  }, [])

  return (
    <div className=' w-screen h-screen ' >
      <img src='/images/logo.svg' alt='logo' />
    </div>
    // <HomeComponent />
  )
}

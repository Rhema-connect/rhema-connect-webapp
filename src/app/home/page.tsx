'use client';
import HomeComponent from '@/components/homecomponent';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Home() {

  const router = useRouter()

  useEffect(()=> {
    router?.push("/dashboard/resources")
  }, [])

  return (
    <HomeComponent />
  )
}

export default Home
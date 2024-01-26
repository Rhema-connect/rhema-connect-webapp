"use client"
import { ChatIcon, DownArrowIcon } from '@/components/svg'
import React from 'react'
import CustomText from '../textcomponent'
import { useRouter } from 'next/navigation'

interface Props {}

function Navbar(props: Props) {
    const {} = props

    const router = useRouter()
    
    return (
        <div className=' w-full relative z-10 ' >
            <div className=' w-full flex justify-end items-center h-[80px] gap-2 ' >
                <ChatIcon />
                <CustomText>English (United States)</CustomText>
                <DownArrowIcon />
            </div>
            <div onClick={()=> router.push("/")} role='button' className=' w-full  flex items-center h-[80px] ' >
                <img src='/images/logo.svg' alt='logo' />
            </div>
        </div>
    )
}

export default Navbar

"use client"
import { ChatIcon, DownArrowIcon, MenuIcon } from '@/components/svg'
import React from 'react'
import CustomText from '../textcomponent'
import { useRouter } from 'next/navigation'

interface Props {}

function Navbar(props: Props) {
    const {} = props

    const router = useRouter()
    
    return (
        <div className=' w-full relative z-10 flex lg:px-0 px-6 lg:flex-col flex-col-reverse ' >
            <div className=' w-full flex lg:justify-end items-center lg:mt-0 mt-6 lg:h-[80px] gap-2 ' >
                <ChatIcon />
                <CustomText>English (United States)</CustomText>
                <DownArrowIcon />
            </div>
            <div onClick={()=> router.push("/")} role='button' className=' w-full  flex items-center justify-between pt-4 h-[64px] lg:h-[80px] ' >
                <img src='/images/logo.svg' alt='logo' />
                <button className=' w-fit lg:hidden ' >
                    <MenuIcon />
                </button>
            </div>
        </div>
    )
}

export default Navbar

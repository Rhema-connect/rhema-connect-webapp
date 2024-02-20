"use client"
import { ChatIcon, DownArrowIcon, MenuIcon } from '@/components/svg'
import React from 'react'
import CustomText from '../textcomponent'
import { useRouter } from 'next/navigation'

interface Props {
    pathname: string
}

function Navbar(props: Props) {
    const {
        pathname
    } = props 
    

    const router = useRouter()

    return (
        <div className={` w-full relative z-10 flex lg:px-6 px-6 ${pathname?.includes("dashboard") ? "lg:h-[96px] h-[86px] text-black " : ""} ${pathname?.includes("dashboard") ? "items-center justify-between " : "" } lg:${pathname?.includes("dashboard") ? "flex-row-reverse" : "flex-col"} ${pathname?.includes("dashboard") ? "flex-row-reverse" : "flex-col-reverse"}  `} >
            <div className={` flex lg:justify-end items-center ${!pathname?.includes("dashboard") ? " lg:h-[80px] w-full lg:mt-0 mt-6" : "h-fit text-sm "} gap-2 `} >
                <ChatIcon />
                <CustomText>English (United States)</CustomText>
                <DownArrowIcon />
            </div>
            <div onClick={() => router.push("/")} role='button' className={`  flex items-center justify-between ${!pathname?.includes("dashboard") ? " h-[64px] lg:h-[80px] w-full  pt-4 " : "h-fit"} `} >
                {!pathname?.includes("/dashboard") ?
                    <img src='/images/logo.svg' alt='logo' /> :
                    <img src='/images/logoblack.svg' alt='logoblack' /> 
                }
                {!pathname?.includes("/dashboard") && (
                    <button className=' w-fit lg:hidden ' >
                        <MenuIcon />
                    </button> 
                )}
            </div>
        </div>
    )
}

export default Navbar

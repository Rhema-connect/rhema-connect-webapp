import { ChatIcon, DownArrowIcon } from '@/components/svg'
import React from 'react'
import CustomText from '../textcomponent'

interface Props {}

function Navbar(props: Props) {
    const {} = props

    return (
        <div className=' w-full relative z-10 ' >
            <div className=' w-full flex justify-end items-center h-[80px] gap-2 ' >
                <ChatIcon />
                <CustomText>English (United States)</CustomText>
                <DownArrowIcon />
            </div>
            <div className=' w-full  flex items-center h-[80px] ' >
                <img src='/images/logo.svg' alt='logo' />
            </div>
        </div>
    )
}

export default Navbar

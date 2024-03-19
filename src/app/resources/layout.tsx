"use client"
import PageLayout from '@/components/pagelayout'
import ResourceHeader from '@/components/resourcecomponent/header'
import CustomText from '@/components/shared/textcomponent'
import { DownArrowIcon, HomeIcon } from '@/components/svg'
import { getCookie } from 'cookies-next'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Props {
    children: React.ReactNode
}

function Layout(props: Props) {
    const {
        children
    } = props

    const router = useRouter()
    const pathname = usePathname()

    const [active, setActive] = useState(pathname)
    const [show, setShow] = useState(false)

    const route = [
        {
            name: 'Video',
            route: '/resources'
        },
        {
            name: 'Audio',
            route: '/resources/audio'
        },
        {
            name: 'Books',
            route: '/resources/book'
        },
    ]


    const clickHandler = (item: string) => {
        setActive(item)
        setShow(false)
        router.push(item)
    }

    useEffect(() => {
        setActive(pathname)
    }, [router])

    console.log(getCookie('googtrans'));


    return (
        <PageLayout>
            <div className=' w-full flex py-11 lg:py-[76px] lg:flex-row flex-col justify-between lg:items-center ' >
                <CustomText className=' font-bold text-[32px] lg:text-[48px] leading-[48px] lg:leading-[64px]' >YOUR RESOURCES</CustomText>
                <button onClick={() => router.push('/')} className=' w-[141px] hidden h-[48px] rounded-lg lg:flex gap-2 items-center bg-[#3B3B3B] border border-[#919EAB52] justify-center ' >
                    <HomeIcon />
                    <CustomText className=' text-[15px] font-bold text-white leading-[26px] ' >Go home</CustomText>
                </button>
                <div className=' w-full lg:hidden mt-4 relative ' >
                    <button onClick={() => setShow((prev) => !prev)} className=' flex items-center gap-2 ' >
                        {route?.map((item: { name: string, route: string }, index) => {
                            if (item?.route === active)
                                return (
                                    <CustomText>{item?.name}</CustomText>
                                )
                        })}
                        <DownArrowIcon />
                    </button>
                    {show && (
                        <> 
                            <div className=' w-[140px] absolute top-9 z-20 flex flex-col gap-1 p-2 bg-[#828282] shadow-lg rounded-lg ' >
                                {route?.map((item: { name: string, route: string }, index) => {
                                    return (
                                        <div role='button' onClick={() => clickHandler(item?.route)} key={index} className={` text-white ${item?.route === active ? ' bg-[#3B3B3B]  ' : ''} h-9 flex items-center px-4 leading-6 `} >
                                            <CustomText>
                                                {item?.name}
                                            </CustomText>
                                        </div>
                                    )
                                })}
                            </div>
                            <div onClick={()=> setShow(false)} className=' inset-0 fixed z-10 ' />
                        </>
                    )}
                </div>
            </div>
            <ResourceHeader path={active} />
            <div className=' w-full flex flex-row gap-6 pt-6 ' >
                <div className=' w-[140px] hidden lg:flex flex-col gap-1 ' >
                    {route?.map((item: { name: string, route: string }, index) => {
                        return (
                            <div role='button' onClick={() => clickHandler(item?.route)} key={index} className={` text-white border-[#BE0027] ${item?.route === active ? 'border-l-2' : ''} h-9 flex items-center px-4 leading-6 `} >
                                <CustomText>
                                    {item?.name}
                                </CustomText>
                            </div>
                        )
                    })}
                </div>
                <div className=' w-full lg:mt-0 mt-6 flex flex-col ' >
                    {children}
                </div>
            </div>
        </PageLayout>
    )
}

export default Layout

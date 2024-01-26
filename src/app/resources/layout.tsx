"use client"
import PageLayout from '@/components/pagelayout'
import ResourceHeader from '@/components/resourcecomponent/header' 
import CustomText from '@/components/shared/textcomponent'
import { HomeIcon } from '@/components/svg'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Props {
    children: React.ReactNode
}

function Layout(props: Props) {
    const {
        children
    } = props

    const router = useRouter()
    const [active, setActive] = useState(window?.location?.pathname)

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
        router.push(item)
    }


    useEffect(() => {
        setActive(window?.location?.pathname)
    }, [router])

    return (
        <PageLayout>
            <div className=' w-full flex py-11 lg:py-[76px]  justify-between items-center ' > 
                <CustomText className=' font-bold text-[32px] lg:text-[48px] leading-[48px] lg:leading-[64px]' >YOUR RESOURCES</CustomText>
                <button onClick={()=> router.push('/')} className=' w-[141px] hidden h-[48px] rounded-lg lg:flex gap-2 items-center bg-[#3B3B3B] border border-[#919EAB52] justify-center ' >
                    <HomeIcon />
                    <CustomText className=' text-[15px] font-bold text-white leading-[26px] ' >Go home</CustomText>
                </button>
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

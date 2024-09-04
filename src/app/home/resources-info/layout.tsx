"use client"
import PageLayout from '@/components/pagelayout'
import ResourceHeader from '@/components/resourcecomponent/header'
import SearchBar from '@/components/shared/searchbar'
import CustomText from '@/components/shared/textcomponent'
import { BackArrow, HomeIcon } from '@/components/svg'
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

    useEffect(() => {
        setActive(pathname)
    }, [router])

    return (
        <PageLayout>
            <div className=' w-full flex py-[4px] flex-col ' >
                {/* <CustomText className=' font-bold text-[48px] leading-[64px]  ' >YOUR RESOURCES</CustomText> */}
                <button onClick={() => router.back()} className=' w-fit h-[48px] rounded-lg flex gap-1 items-center bg-transparent justify-center ' >
                    <BackArrow />
                    <CustomText className=' text-white leading-[24px] ' >Go back</CustomText>
                </button>
                {active === '/resources-info/audio' && (
                    <div className=' mt-6 w-full flex justify-start ' >
                        <SearchBar />
                    </div>
                )}
            </div>
            <ResourceHeader path={active} />
            <div  style={{ background: pathname?.includes("/resources-info/video/") ? "" : "linear-gradient(126.5deg, rgba(255, 255, 255, 0.24) -4.87%, rgba(255, 255, 255, 0) 112.83%)" }} className=' w-full px-6 py-4 rounded-lg ' >
                {children}
            </div>
        </PageLayout>
    )
}

export default Layout

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
    }, [])

    const clickHandler = () => {
        if(pathname?.includes("book")) {
            router?.push("")
        } else if(pathname?.includes("book")) {
            router?.push("")
        } else if(pathname?.includes("book")) {
            router?.push("")
        }
    }

    return (
        <PageLayout>
            <div className=' w-full flex py-[4px] flex-col bg-white text-black ' >
                {/* <CustomText className=' font-bold text-[48px] leading-[64px]  ' >YOUR RESOURCES</CustomText> */}
                <div role='button' onClick={() => router.back()} className=' w-fit h-[48px] rounded-lg flex gap-1 items-center bg-transparent justify-center ' >
                    <BackArrow color='black' />
                    <CustomText className=' leading-[24px] ' >Go back</CustomText>
                </div>
                {active === '/resources-info/audio' && (
                    <div className=' mt-6 w-full flex justify-start ' >
                        <SearchBar />
                    </div>
                )}
            </div>
            {/* <ResourceHeader path={active} /> */}
            <div className=' w-full ' >
                {children}
            </div>
        </PageLayout>
    )
}

export default Layout

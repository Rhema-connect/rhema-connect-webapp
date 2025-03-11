import React, { useEffect, useState } from 'react'
import { Connect } from '../svg'
import CustomText from '../shared/textcomponent'
import { usePathname } from 'next/navigation'

interface Props {
    children: React.ReactNode
}

function PageLayout(props: Props) {
    const {
        children
    } = props

    const pathname = usePathname() 

    return (
        <div className=' w-full h-full py-8 relative lg:px-0 px-4 ' >
            {pathname.includes('/resources-info/video') && (
                <div
                 style={{ flexShrink: 0 }} className=' w-[90vw] lg:w-[625px] h-[142px] lg:h-[217px] absolute -z-10 rounded-2xl top-[50px] left-[170px] bg-[#720017] ' 
                />
            )}
            {/* <div className=' w-full -z-20 flex inset-x-0 top-[50px] absolute left-[170px] ' >
                <img src='/images/one.png' alt='one' />
                <img src='/images/two.png' alt='two' />
            </div> */}
            {children}
        </div>
    )
}

export default PageLayout

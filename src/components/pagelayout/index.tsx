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
    

    const [active, setActive] = useState(pathname) 

    useEffect(() => {
        setActive(pathname)
    }, [])

    return ( 
        <div className=' w-full relative mt-8 pb-4 ' >
            <div className=' absolute lg:block hidden top-[210px] left-[32px] z-20 ' >
                <Connect />
            </div>
            {active !== '/resources-info/audio' && (
                <div style={{ flexShrink: 0 }} className=' w-[90vw] lg:w-[625px] h-[142px] lg:h-[217px] absolute -z-10 rounded-2xl top-[50px] left-[170px] bg-[#720017] ' />
            )}
            <div className=' w-full -z-20 flex inset-x-0 top-[50px] absolute left-[170px] ' >
                <img src='/images/one.png' alt='one' />
                <img src='/images/two.png' alt='two' />
            </div>

            <div className=' lg:pl-[220px] z-30 relative w-full pt-[50px] ' >
                {children}
            </div>

            <CustomText className='lg:pl-[170px] lg:text-left text-center text-[22.4px] mt-40 text-[#BEBEBE] text-sm ' >© RHEMA MENA 2023. All right reserved</CustomText>
        </div>
    )
}

export default PageLayout

"use client"
import React from 'react'
import { Connect } from '../svg'
import PageLayout from '../pagelayout'
import CustomText from '../shared/textcomponent'
import { usePathname, useRouter } from 'next/navigation'

interface Props { }

function HomeComponent(props: Props) {
    const { } = props 

    const router = useRouter()
    const pathname = usePathname() 
    
    console.log(pathname);
    

    return ( 
        <PageLayout>
        {/* <div className=' pl-[220px] z-30 relative  pt-[50px] ' > */}
            <CustomText className=' font-bold text-[32px] lg:text-[48px] leading-[48px] lg:leading-[64px] py-11 lg:py-[76px] ' >PLEASE SELECT YOUR LANGUAGE</CustomText>
            <div className=' w-full grid grid-cols-2 lg:flex flex-row gap-6 mt-8 ' >
                <div className=' w-full lg:w-fit flex gap-4 flex-col ' >
                    <div className=' w-full lg:w-[226px] lg:h-[226px] h-[160px] rounded-2xl ' >
                        <img className=' w-full h-full object-contain ' src='/images/flag1.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium mt-1 text-white ' >ARABIC</CustomText>
                </div> 
                <div className=' w-full lg:w-fit flex gap-4 flex-col ' >
                    <div className=' w-full lg:w-[226px] lg:h-[226px] h-[160px] rounded-2xl ' >
                        <img className=' w-full h-full object-contain ' src='/images/flag2.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium mt-1 text-white ' >FARSI</CustomText>
                </div> 
                <div className=' w-full lg:w-fit flex gap-4 flex-col ' >
                    <div className=' w-full lg:w-[226px] lg:h-[226px] h-[160px] rounded-2xl ' >
                        <img className=' w-full h-full object-contain ' src='/images/flag3.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium mt-1 text-white ' >TURKISH</CustomText>
                </div> 
            </div>
            <div className=' w-full grid grid-cols-2 lg:flex flex-row gap-6 mt-8 ' >
                <div role='button' onClick={()=> router.push('/resources')} className=' lg:w-fit w-full flex gap-4 flex-col ' >
                    <div className=' w-full lg:w-[126px] h-[160px] lg:h-[126px] rounded-2xl ' >
                        <img className=' w-full h-full object-contain ' src='/images/flag4.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium mt-1 text-white ' >English</CustomText>
                </div> 
                <div className=' lg:w-fit w-full flex gap-4 flex-col ' >
                    <div className=' w-full lg:w-[126px] h-[160px] lg:h-[126px] rounded-2xl ' >
                        <img className=' w-full h-full object-contain '  src='/images/flag5.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium mt-1 text-white ' >Spanish</CustomText>
                </div> 
                <div className=' lg:w-fit w-full flex gap-4 flex-col ' >
                    <div className=' w-full lg:w-[126px] h-[160px] lg:h-[126px] rounded-2xl ' >
                        <img className=' w-full h-full object-contain '  src='/images/flag6.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium mt-1 text-white ' >French</CustomText>
                </div> 
                <div className=' lg:w-fit w-full flex gap-4 flex-col ' >
                    <div className=' w-full lg:w-[126px] h-[160px] lg:h-[126px] rounded-2xl ' >
                        <img className=' w-full h-full object-contain '  src='/images/flag7.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium mt-1 text-white ' >Portuguese</CustomText>
                </div> 
                <div className=' lg:w-fit w-full flex gap-4 flex-col ' >
                    <div className=' w-full lg:w-[126px] h-[160px] lg:h-[126px] rounded-2xl ' >
                        <img className=' w-full h-full object-contain '  src='/images/flag8.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium mt-1 text-white ' >Italian</CustomText>
                </div> 
            </div>
        {/* </div>  */}
        </PageLayout>
    )
}

export default HomeComponent

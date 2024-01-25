"use client"
import React from 'react'
import { Connect } from '../svg'
import PageLayout from '../pagelayout'
import CustomText from '../shared/textcomponent'
import { useRouter } from 'next/navigation'

interface Props { }

function HomeComponent(props: Props) {
    const { } = props

    const router = useRouter()

    return ( 
        <PageLayout>
        {/* <div className=' pl-[220px] z-30 relative  pt-[50px] ' > */}
            <CustomText className=' font-bold text-[48px] leading-[64px] py-[76px] ' >PLEASE SELECT YOUR LANGUAGE</CustomText>
            <div className=' w-full flex flex-row gap-6 mt-8 ' >
                <div className=' w-fit flex gap-4 flex-col ' >
                    <div className=' w-[226px] h-[226px] rounded-2xl ' >
                        <img src='/images/flag1.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium text-white ' >ARABIC</CustomText>
                </div> 
                <div className=' w-fit flex gap-4 flex-col ' >
                    <div className=' w-[226px] h-[226px] rounded-2xl ' >
                        <img src='/images/flag2.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium text-white ' >FARSI</CustomText>
                </div> 
                <div className=' w-fit flex gap-4 flex-col ' >
                    <div className=' w-[226px] h-[226px] rounded-2xl ' >
                        <img src='/images/flag3.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium text-white ' >TURKISH</CustomText>
                </div> 
            </div>
            <div className=' w-full flex flex-row gap-6 mt-8 ' >
                <div role='button' onClick={()=> router.push('/resources')} className=' w-fit flex gap-4 flex-col ' >
                    <div className=' w-[126px] h-[126px] rounded-2xl ' >
                        <img src='/images/flag4.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium text-white ' >English</CustomText>
                </div> 
                <div className=' w-fit flex gap-4 flex-col ' >
                    <div className=' w-[126px] h-[126px] rounded-2xl ' >
                        <img src='/images/flag5.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium text-white ' >Spanish</CustomText>
                </div> 
                <div className=' w-fit flex gap-4 flex-col ' >
                    <div className=' w-[126px] h-[126px] rounded-2xl ' >
                        <img src='/images/flag6.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium text-white ' >French</CustomText>
                </div> 
                <div className=' w-fit flex gap-4 flex-col ' >
                    <div className=' w-[126px] h-[126px] rounded-2xl ' >
                        <img src='/images/flag7.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium text-white ' >Portuguese</CustomText>
                </div> 
                <div className=' w-fit flex gap-4 flex-col ' >
                    <div className=' w-[126px] h-[126px] rounded-2xl ' >
                        <img src='/images/flag8.png' />
                    </div>
                    <CustomText className=' leading-[24px] font-medium text-white ' >Italian</CustomText>
                </div> 
            </div>
        {/* </div>  */}
        </PageLayout>
    )
}

export default HomeComponent

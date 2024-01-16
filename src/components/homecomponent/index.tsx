import React from 'react'
import { Connect } from '../svg'

interface Props { }

function HomeComponent(props: Props) {
    const { } = props

    return (
        <div className=' relative mt-8 ' >
            <div className=' absolute top-[170px] left-[32px] z-20 ' >
                <Connect />
            </div>
            <div style={{ flexShrink: 0 }} className=' w-[625px] h-[217px] absolute z-20 rounded-2xl top-[50px] left-[170px] bg-[#720017] ' />
            <div className=' pl-[220px] z-30 relative  pt-[50px] ' >
                <p className=' font-bold text-[48px] leading-[64px] py-[76px] ' >PLEASE SELECT YOUR LANGUAGE</p>
                <div className=' w-full flex flex-row gap-6 mt-8 ' >
                    <div className=' w-fit flex gap-4 flex-col ' >
                        <div className=' w-[226px] h-[226px] rounded-2xl ' >
                            <img src='/images/flag1.png' />
                        </div>
                        <p className=' leading-[24px] font-medium text-white ' >ARABIC</p>
                    </div> 
                    <div className=' w-fit flex gap-4 flex-col ' >
                        <div className=' w-[226px] h-[226px] rounded-2xl ' >
                            <img src='/images/flag2.png' />
                        </div>
                        <p className=' leading-[24px] font-medium text-white ' >FARSI</p>
                    </div> 
                    <div className=' w-fit flex gap-4 flex-col ' >
                        <div className=' w-[226px] h-[226px] rounded-2xl ' >
                            <img src='/images/flag3.png' />
                        </div>
                        <p className=' leading-[24px] font-medium text-white ' >TURKISH</p>
                    </div> 
                </div>
                <div className=' w-full flex flex-row gap-6 mt-8 ' >
                    <div className=' w-fit flex gap-4 flex-col ' >
                        <div className=' w-[126px] h-[126px] rounded-2xl ' >
                            <img src='/images/flag4.png' />
                        </div>
                        <p className=' leading-[24px] font-medium text-white ' >English</p>
                    </div> 
                    <div className=' w-fit flex gap-4 flex-col ' >
                        <div className=' w-[126px] h-[126px] rounded-2xl ' >
                            <img src='/images/flag5.png' />
                        </div>
                        <p className=' leading-[24px] font-medium text-white ' >Spanish</p>
                    </div> 
                    <div className=' w-fit flex gap-4 flex-col ' >
                        <div className=' w-[126px] h-[126px] rounded-2xl ' >
                            <img src='/images/flag6.png' />
                        </div>
                        <p className=' leading-[24px] font-medium text-white ' >French</p>
                    </div> 
                    <div className=' w-fit flex gap-4 flex-col ' >
                        <div className=' w-[126px] h-[126px] rounded-2xl ' >
                            <img src='/images/flag7.png' />
                        </div>
                        <p className=' leading-[24px] font-medium text-white ' >Portuguese</p>
                    </div> 
                    <div className=' w-fit flex gap-4 flex-col ' >
                        <div className=' w-[126px] h-[126px] rounded-2xl ' >
                            <img src='/images/flag8.png' />
                        </div>
                        <p className=' leading-[24px] font-medium text-white ' >Italian</p>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default HomeComponent

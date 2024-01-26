import CustomText from '@/components/shared/textcomponent'
import React from 'react'

interface Props { }

function AudioResourceInfo(props: Props) {
    const { } = props

    return (
        <div className=' w-full text-white pt-8 ' >
            <div className=' w-full flex gap-6 pb-[18px] border-b border-[#828282] ' >
                <div className=' w-[204px] h-[204px] rounded-2xl bg-purple-700 ' />
                <div className=' pt-4 ' >
                    <CustomText className=' text-[24px] leading-[36px] font-bold ' >Good Life</CustomText>
                    <CustomText className=' leading-[22px] text-sm ' >Playlist ・ 12 messages</CustomText>
                </div>
            </div>
            <div className=' w-full pt-8 flex flex-col gap-[18px] ' >
                <div className=' w-full flex items-center justify-between ' >
                    <div className=' flex items-center gap-[18px] ' >
                        <div className=' w-[56px] h-[56px] rounded-2xl bg-slate-950 ' />
                        <CustomText className=' text-sm font-medium leading-[22px] ' >Life of Honor</CustomText>
                    </div>
                    <CustomText className=' text-xs leading-[18px] ' >Pastor Matt ・ Good Life</CustomText>
                    <CustomText className=' text-xs leading-[18px] ' >2.26</CustomText>
                </div>
                <div className=' w-full flex items-center justify-between ' >
                    <div className=' flex items-center gap-[18px] ' >
                        <div className=' w-[56px] h-[56px] rounded-2xl bg-slate-950 ' />
                        <CustomText className=' text-sm font-medium leading-[22px] ' >Life of Honor</CustomText>
                    </div>
                    <CustomText className=' text-xs leading-[18px] ' >Pastor Matt ・ Good Life</CustomText>
                    <CustomText className=' text-xs leading-[18px] ' >2.26</CustomText>
                </div>
                <div className=' w-full flex items-center justify-between ' >
                    <div className=' flex items-center gap-[18px] ' >
                        <div className=' w-[56px] h-[56px] rounded-2xl bg-slate-950 ' />
                        <CustomText className=' text-sm font-medium leading-[22px] ' >Life of Honor</CustomText>
                    </div>
                    <CustomText className=' text-xs leading-[18px] ' >Pastor Matt ・ Good Life</CustomText>
                    <CustomText className=' text-xs leading-[18px] ' >2.26</CustomText>
                </div>
                <div className=' w-full flex items-center justify-between ' >
                    <div className=' flex items-center gap-[18px] ' >
                        <div className=' w-[56px] h-[56px] rounded-2xl bg-slate-950 ' />
                        <CustomText className=' text-sm font-medium leading-[22px] ' >Life of Honor</CustomText>
                    </div>
                    <CustomText className=' text-xs leading-[18px] ' >Pastor Matt ・ Good Life</CustomText>
                    <CustomText className=' text-xs leading-[18px] ' >2.26</CustomText>
                </div>
                <div className=' w-full flex items-center justify-between ' >
                    <div className=' flex items-center gap-[18px] ' >
                        <div className=' w-[56px] h-[56px] rounded-2xl bg-slate-950 ' />
                        <CustomText className=' text-sm font-medium leading-[22px] ' >Life of Honor</CustomText>
                    </div>
                    <CustomText className=' text-xs leading-[18px] ' >Pastor Matt ・ Good Life</CustomText>
                    <CustomText className=' text-xs leading-[18px] ' >2.26</CustomText>
                </div>
            </div>
        </div>
    )
}

export default AudioResourceInfo

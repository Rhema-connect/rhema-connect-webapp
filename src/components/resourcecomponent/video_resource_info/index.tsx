import CustomText from '@/components/shared/textcomponent'
import { BackArrow, PersonIcon, SendIcon, ThumbsUp } from '@/components/svg'
import React from 'react'

interface Props { }

function VideoResourceInfo(props: Props) {
    const { } = props

    const data = [
        {
            title: "Pneumatology Basic  - Part 1: The Beginning",
            name: "Pastor Matt",
            views: "200 views"
        },
        {
            title: "Pneumatology Basic  - Part 1: The Beginning",
            name: "Pastor Matt",
            views: "200 views"
        },
        {
            title: "Pneumatology Basic  - Part 1: The Beginning",
            name: "Pastor Matt",
            views: "200 views"
        },
        {
            title: "Pneumatology Basic  - Part 1: The Beginning",
            name: "Pastor Matt",
            views: "200 views"
        },
        {
            title: "Pneumatology Basic  - Part 1: The Beginning",
            name: "Pastor Matt",
            views: "200 views"
        },
    ]

    const CommentData = () => {
        return ( 
            <div className=' w-full flex ' >
                <div className=' pb-6 border-b border-[#828282] w-full flex gap-[25px] ' >
                    <div className=' w-fit ' >
                        <div className=' w-[48px] h-[48px] rounded-full bg-slate-900 ' />
                    </div>
                    <div className=' pt-2 w-full ' >
                        <div className=' flex gap-3 items-center ' >
                            <CustomText className=' leading-[24px] font-medium ' >XoXo</CustomText>
                            <CustomText className=' leading-[22px] text-[#707070] text-sm ' >2 days ago</CustomText>
                        </div>
                        <CustomText className=' leading-[24px] mt-3 ' >An Unforgettable Delight! Oh, where do I even begin? Barbie 2023 is a tour de force that has left me utterly captivated, enchanted, and spellbound.</CustomText>
                    </div>
                    <div className=' w-fit flex gap-[13px]  ' >
                        <div role='button' className=' w-[45px] h-[45px] rounded-full flex justify-center items-center border border-white ' >
                            <ThumbsUp />
                        </div>
                        <div role='button' className=' w-[45px] -rotate-180 h-[45px] rounded-full flex justify-center items-center border border-[#919EAB] ' >
                            <ThumbsUp color='#919EAB' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className=' w-full ' >
            <div className=' w-full flex gap-6  ' >
                <div className=' w-full h-[477px] rounded-[14px] bg-yellow-600 ' >

                </div>
                <div className=' w-fit text-white ' >
                    <div className=' w-[321px] ' >
                        <CustomText className=' font-bold text-lg leading-7 ' >Others also likes</CustomText>
                        <div className=' w-full mt-6 max-h-[420px] flex flex-col gap-4 pr-3 overflow-y-auto ' >
                            {data?.map((item: { title: string, name: string, views: string }, index: number) => {
                                return (
                                    <div key={index} className=' w-full flex items-center gap-3 ' >
                                        <div className=' w-[104px] h-[80px] rounded-lg bg-slate-950 ' />
                                        <div>
                                            <CustomText className=' leading-[22px] font-medium text-sm ' >{item?.title}</CustomText>
                                            <CustomText className=' leading-[18px] text-[#BEBEBE] text-xs ' >{item?.name}</CustomText>
                                            <CustomText className=' leading-[18px] text-[#BEBEBE] text-xs ' >{item?.views}</CustomText>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className=' w-full flex gap-6  ' >
                <div className=' w-full py-6 ' >
                    <CustomText className=' leading-[44.8px] text-[32px] font-semibold ' >Pneumatology Basics</CustomText>
                    <CustomText className=' text-[#919EAB] leading-[22.4px] mt-[11px] ' >450 views</CustomText>
                    <CustomText className=' leading-[22.4px] my-[19px] ' >The UX Master Class is a comprehensive and immersive course designed to equip participants with the knowledge  - <span role='button' style={{ color: "#919EAB" }} >more</span></CustomText>
                    <CustomText className=' leading-[28px] font-bold text-lg ' >4021 comments</CustomText>
                    <div className=' w-full px-[25px] py-[21px] flex items-center justify-between border border-[#828282] rounded-[20px] ' >
                        <div className=' w-full flex items-center gap-[25px]  ' >
                            <PersonIcon />
                            <input placeholder='Add a comment' className=' bg-transparent  w-full px-4 outline-none py-2 ' />
                        </div>
                        <button className=' outline-none ' >
                            <SendIcon />
                        </button>
                    </div>
                    <div className=' w-full py-9 flex flex-col gap-5  ' >
                        <CommentData />
                        <CommentData />
                        <CommentData />
                        <CommentData />
                    </div>
                    <div className=' w-full flex justify-center items-center ' >
                        <button className=' outline-none rounded-[50px] bg-transparent border border-[#4D4D4D] h-[52px] px-4 flex items-center justify-center gap-2 ' >
                            <CustomText className=' leading-6 text-white ' >See all</CustomText>
                            <div className=' -rotate-90 ' >
                                <BackArrow />
                            </div>
                        </button>
                    </div>
                </div>

                <div className=' w-fit text-white ' >
                    <div className=' w-[321px] ' />
                </div>
            </div>
        </div>
    )
}

export default VideoResourceInfo

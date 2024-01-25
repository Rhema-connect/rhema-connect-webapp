import React from 'react'
import { Connect, RoundedArrow } from '../../svg'
import PageLayout from '../../pagelayout'
import SearchBar from '../../shared/searchbar'
import CustomText from '../../shared/textcomponent'

interface Props { }

function AudioResource(props: Props) {
    const { } = props

    const data = [
        {
            title: 'Life of Honor',
            body: 'Playlist ・ Good Life'
        },
        {
            title: 'Life of Honor',
            body: 'Playlist ・ Good Life'
        },
        {
            title: 'Life of Honor',
            body: 'Playlist ・ Good Life'
        },
        {
            title: 'Life of Honor',
            body: 'Playlist ・ Good Life'
        },
        {
            title: 'Life of Honor',
            body: 'Playlist ・ Good Life'
        },
        {
            title: 'Life of Honor',
            body: 'Playlist ・ Good Life'
        },
        {
            title: 'Life of Honor',
            body: 'Playlist ・ Good Life'
        },
        {
            title: 'Life of Honor',
            body: 'Playlist ・ Good Life'
        },
    ]

    return (
        <div className=' w-full ' >
            <div className=' w-full grid grid-cols-4 gap-4 gap-y-10  ' >
                {data?.map((item: { title: string, body: string }, index: number) => {
                    return (
                        <div key={index} className=' w-full  ' >
                            <div className=' w-full h-[204px] bg-red-900 rounded-2xl ' >

                            </div>
                            <CustomText className=' leading-[22px] font-medium text-[14px] mt-4 '  >
                                {item?.title}
                            </CustomText>
                            <CustomText className=' leading-[18px] text-xs ' >
                                {item?.body}
                            </CustomText>
                        </div>
                    )
                })}
            </div>
            <div className=' w-full mt-14 ' >
                <div className=' w-full flex justify-between items-center ' >
                    <CustomText className=' text-[20px] leading-[30px] font-bold ' >Top Messages</CustomText>
                    <div className=' w-fit flex items-center gap-8 ' >
                        <div className=' flex gap-2 ' >
                            <button className=' rounded-2xl border border-white bg-transparent px-3 h-8 ' >More </button>
                            <div role='button' >
                                <RoundedArrow />
                            </div>
                            <div role='button' className=' rotate-180 ' >
                                <RoundedArrow />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-full grid grid-cols-3 gap-9 mt-8 ' >
                    {data?.map((item: { title: string, body: string }, index: number) => {
                        return (
                            <div key={index} className=' w-full flex items-center gap-[18px] ' >
                                <div className=' w-14 h-14 bg-red-900 rounded-2xl ' >

                                </div>
                                <div> 
                                    <CustomText className=' leading-[22px] font-medium text-[14px] '  >
                                        {item?.title}
                                    </CustomText>
                                    <CustomText className=' leading-[18px] text-xs ' >
                                        {item?.body}
                                    </CustomText>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AudioResource

"use client"
import React from 'react'
import { Connect } from '../../svg'
import PageLayout from '../../pagelayout'
import SearchBar from '../../shared/searchbar'
import CustomText from '../../shared/textcomponent'
import { useRouter } from 'next/navigation'

interface Props { }

function VideoResource(props: Props) {
    const { } = props

    const data = [
        {
            title: 'This is the video title',
            body: 'A short description goes here views and date'
        },
        {
            title: 'This is the video title',
            body: 'A short description goes here views and date'
        },
        {
            title: 'This is the video title',
            body: 'A short description goes here views and date'
        },
        {
            title: 'This is the video title',
            body: 'A short description goes here views and date'
        },
        {
            title: 'This is the video title',
            body: 'A short description goes here views and date'
        },
        {
            title: 'This is the video title',
            body: 'A short description goes here views and date'
        },
        {
            title: 'This is the video title',
            body: 'A short description goes here views and date'
        },
        {
            title: 'This is the video title',
            body: 'A short description goes here views and date'
        },
    ]

    const router = useRouter()

    return (
        <div className=' w-full grid grid-cols-1 lg:grid-cols-3 gap-4 gap-y-10 ' >
            {data?.map((item: { title: string, body: string }, index: number) => {
                return ( 
                    <div role='button' onClick={()=> router.push("/resources-info/video")} key={index} className=' w-full  ' >
                        <div className=' w-full h-[160px] bg-red-900 rounded-2xl ' >

                        </div>
                        <CustomText className=' leading-[30px] font-bold text-[20px] mt-4 '  >
                            {item?.title}
                        </CustomText>
                        <CustomText className=' leading-6 ' >
                            {item?.body}
                        </CustomText>
                    </div>
                )
            })}
        </div>
    )
}

export default VideoResource

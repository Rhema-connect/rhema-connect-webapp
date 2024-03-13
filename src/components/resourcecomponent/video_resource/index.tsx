"use client"
import React, { useState } from 'react'
import CustomText from '../../shared/textcomponent'
import { useRouter } from 'next/navigation'
import actionService from '@/connections/getdataaction'
import { useQuery } from 'react-query'
import { ContentData } from '@/models'
import LoadingAnimation from '@/components/shared/loading_animation'

interface Props {

}

function VideoResource(props: Props) {
    const { } = props

    const datainfo = [
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

    const [data, setData] = useState([] as Array<ContentData>)


    const { isLoading } = useQuery(['videolist'], () => actionService.getservicedata(`/content`,
        {
            limit: 20,
            page: 0,
            type: "VIDEO"
        }),
        {
            onError: (error: any) => {
                console.error(error);
            },
            onSuccess: (data: any) => {
                console.log(data?.data?.data);
                setData(data?.data?.data)
            }
        }
    )

    const router = useRouter()

    const clickHandler =(item: string | number)=> { 
        router.push("/resources-info/video/"+item)
    }

    return (
        <LoadingAnimation loading={isLoading} length={data?.length} >
            <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10 ' >
                {data?.map((item: ContentData, index: number) => {
                    return (
                        <div role='button' onClick={() => clickHandler(item?.id ? item?.id : "")} key={index} className=' w-full  ' >
                            <div className=' w-full lg:w-full lg:h-[180px] h-[160px] bg-red-900 rounded-2xl ' >
                                <img src={item?.thumbnail} alt='video' className=' w-full h-full rounded-2xl ' />
                            </div>
                            <CustomText className=' leading-[30px] font-bold text-[20px] mt-4 '  >
                                {item?.title}
                            </CustomText>
                            <CustomText className=' text-[14px] leading-6 ' >
                                {item?.description}
                            </CustomText>
                        </div>
                    )
                })}
            </div>
        </LoadingAnimation>
    )
}

export default VideoResource

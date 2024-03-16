"use client"
import LoadingAnimation from '@/components/shared/loading_animation'
import CustomText from '@/components/shared/textcomponent'
import actionService from '@/connections/getdataaction'
import { ContentData } from '@/models'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

interface Props { }

function BookResource(props: Props) {
    const { } = props

    const datainfo = [
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
    ]


    const [data, setData] = useState([] as Array<ContentData>)


    const { isLoading } = useQuery(['audilist'], () => actionService.getservicedata(`/content/books`,
        {
            limit: 10,
            page: 0,
        }),
        {
            onError: (error: any) => {
                console.error(error);
            },
            onSuccess: (data: any) => {
                console.log(data?.data?.data);
                if(data?.data?.data.length > 0){
                    setData(data?.data?.data)
                }
            }
        }
    )

    console.log(data);
    

    return (
        <div className=' w-full ' >
            <LoadingAnimation loading={isLoading} length={data?.length} > 
                <div className=' w-full grid grid-cols-3 gap-6 gap-y-12  ' >
                    {data?.map((item: ContentData, index: number) => {
                        return (
                            <div key={index} className=' w-full  ' >
                                <div className=' flex items-center gap-2 ' >
                                    <div className=' w-6 h-6 rounded-full bg-slate-600 ' />
                                    <CustomText className=' leading-6 text-sm ' >{item?.author_name}</CustomText>
                                </div>
                                <CustomText className=' leading-[23px] font-medium mt-2 '  >
                                    {item?.title}
                                </CustomText>
                                {/* <CustomText className=' leading-[18px] text-xs ' >
                                {item?.read}
                            </CustomText> */}
                            </div>
                        )
                    })}
                </div>
            </LoadingAnimation>
        </div>
    )
}

export default BookResource

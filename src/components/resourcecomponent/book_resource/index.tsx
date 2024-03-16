"use client"
import LoadingAnimation from '@/components/shared/loading_animation'
import CustomText from '@/components/shared/textcomponent'
import actionService from '@/connections/getdataaction'
import { ContentData } from '@/models'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import DeleteContent from '../delete_content'
import { formatTimeAgo } from '@/util/dateformat'
import { useRouter } from 'next/navigation'

interface Props { }

function BookResource(props: Props) {
    const { } = props

    const [data, setData] = useState([] as Array<ContentData>)

    const router = useRouter()

    const { isLoading, isRefetching } = useQuery(['bookslist'], () => actionService.getservicedata(`/content/books/all`,
        {
            limit: 10,
            page: 1,
        }),
        {
            onError: (error: any) => {
                console.error(error);
            },
            onSuccess: (data: any) => {
                console.log(data?.data?.data);
                if (data?.data?.data.length > 0) {
                    setData(data?.data?.data)
                }
            }
        }
    )

    const clickHandler =(item: string)=> {
        window.open (item, '_ blank');
    }

    return (
        <div className=' w-full ' >
            <LoadingAnimation loading={isLoading} refeching={isRefetching} length={data?.length} >
                <div className=' w-full grid grid-cols-3 gap-6 gap-y-12  ' >
                    {data?.map((item: ContentData, index: number) => {
                        return (
                            // <a key={index} href={item?.url} target="_blank" > 
                                <div role='button' key={index} onClick={()=> clickHandler(item?.url ?? "")} className=' w-full rounded-2xl items-center flex p-3 shadow-xl  ' >
                                    <div className=' w-full ' >
                                        <div className=' flex items-center gap-2 ' >
                                            <div className=' w-12 h-12 rounded-full bg-slate-600 '>
                                                <img alt='thumbnail' src={item?.thumbnail} className="w-full h-full object-cover rounded-2xl " />
                                            </div>
                                            <CustomText className=' leading-6 text-sm ' >{item?.author_name}</CustomText>
                                        </div>
                                        <CustomText className=' leading-[23px] font-medium mt-2 '  >
                                            {item?.title}
                                        </CustomText>
                                        <CustomText className=' leading-[18px] text-xs ' >
                                            {formatTimeAgo(new Date(item?.created_at ?? "").getTime())}
                                        </CustomText>
                                    </div>
                                    <DeleteContent id={item?.id} />
                                </div>
                            // </a>
                        )
                    })}
                </div>
            </LoadingAnimation>
        </div>
    )
}

export default BookResource

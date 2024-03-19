"use client"
import React, { useState } from 'react'
import CustomText from '../../shared/textcomponent'
import { useRouter } from 'next/navigation'
import actionService from '@/connections/getdataaction'
import { useQuery } from 'react-query'
import { ContentData } from '@/models'
import LoadingAnimation from '@/components/shared/loading_animation'
import DeleteContent from '../delete_content'
import { textLimit } from '@/util/textlimit'

interface Props {
    admin?: boolean
}

function VideoResource(props: Props) {
    const {
        admin
    } = props

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

    const clickHandler = (item: string | number) => {
        router.push("/resources-info/video/" + item)
    }

    return (
        <LoadingAnimation loading={isLoading} length={data?.length} >
            <div className=' w-full flex justify-center ' > 
                <div className=' w-fit md:w-fit lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10 ' >
                    {data?.map((item: ContentData, index: number) => {
                        return (
                            <div role='button' onClick={() => clickHandler(item?.id ? item?.id : "")} key={index} className=' lg:max-w-full max-w-[400px] w-full md:w-[300px] ' >
                                <div className=' w-full  lg:w-full lg:h-[180px] h-[200px] bg-red-900 rounded-2xl ' >
                                    <img src={item?.thumbnail} alt='video' className=' w-full h-full rounded-2xl ' />
                                </div>
                                <div className=' w-full flex justify-between  mt-4 ' >
                                    <div>
                                        <CustomText className=' leading-[30px] font-bold text-[20px]'  >
                                            {item?.title}
                                        </CustomText>
                                        {item?.description && (
                                            <CustomText className=' text-[14px] leading-6 ' >
                                                {textLimit(item?.description, 30)}
                                            </CustomText>
                                        )}
                                    </div>
                                    {admin && (
                                        <div className=' w-fit ' >
                                            <DeleteContent id={item?.id} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </LoadingAnimation>
    )
}

export default VideoResource

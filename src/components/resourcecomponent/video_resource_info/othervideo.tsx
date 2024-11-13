import CustomText from '@/components/shared/textcomponent'
import VideoPlayer from '@/components/shared/videoPlayer'
import actionService from '@/connections/getdataaction'
import { ContentData } from '@/models'
import { textLimit } from '@/util/textlimit'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

interface Props {
    dashboard?: boolean
}

function Othervideo(props: Props) {
    const {
        dashboard
    } = props

    const [data, setData] = useState([] as Array<ContentData>)

    const router = useRouter()

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
                setData(data?.data?.data)
            }
        }
    )

    const clickHandler = (item: string | number) => {
        if (dashboard) {
            router.push("/dashboard/resources-info/video/" + item)
        } else {
            router.push("/resources-info/video/" + item)
        }
    }

    return (
        <div className=' w-full py-4 max-h-[70vh] lg:max-h-[420px] flex flex-col gap-4 overflow-y-auto ' >
            {data?.map((item: ContentData, index: number) => {
                return (
                    <div role='button' onClick={() => clickHandler(item?.id ? item?.id : "")} key={index} className=' w-full flex items-center gap-3 ' >
                        <div className=' w-[160px] h-[100px] rounded-lg bg-slate-950 ' >
                            {/* <img src={item?.thumbnail} alt='video' className=' w-full h-full rounded-lg ' /> */}
                            <VideoPlayer src={item?.youtube_url + ""} rounded='16px' width={160} height={100} measureType="px" />
                        </div>
                        <div>
                            <CustomText className=' leading-[22px] font-medium text-sm ' >{textLimit(item?.title+"", 15)}</CustomText>
                            <CustomText className=' leading-[18px] text-[#BEBEBE] text-xs ' >{textLimit(item?.description+"ubjdgud kfndjfbhd nfdjnfdbf fhfudbufb dfnkgnd", 40)}</CustomText>
                            {/* <CustomText className=' leading-[18px] text-[#BEBEBE] text-xs ' >{item?.views}</CustomText> */}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Othervideo

import CustomText from '@/components/shared/textcomponent'
import actionService from '@/connections/getdataaction'
import { ContentData } from '@/models'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

interface Props { }

function Othervideo(props: Props) {
    const { } = props 

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
                setData(data?.data?.data)
            }
        }
    )

    return (
        <div className=' w-full mt-6 max-h-[420px] flex flex-col gap-4 pr-3 overflow-y-auto ' >
            {data?.map((item: ContentData, index: number) => {
                return (
                    <div key={index} className=' w-full flex items-center gap-3 ' >
                        <div className=' w-[104px] h-[80px] rounded-lg bg-slate-950 ' />
                        <div>
                            <CustomText className=' leading-[22px] font-medium text-sm ' >{item?.title}</CustomText>
                            {/* <CustomText className=' leading-[18px] text-[#BEBEBE] text-xs ' >{item?.name}</CustomText> */}
                            {/* <CustomText className=' leading-[18px] text-[#BEBEBE] text-xs ' >{item?.views}</CustomText> */}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Othervideo

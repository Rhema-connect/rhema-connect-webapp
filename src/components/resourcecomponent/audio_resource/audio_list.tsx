import AudioPlayer from '@/components/shared/musicplayer'
import CustomText from '@/components/shared/textcomponent'
import { RoundedArrow } from '@/components/svg'
import actionService from '@/connections/getdataaction'
import { ContentData } from '@/models'
import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query'
import DeleteContent from '../delete_content'
import LoadingAnimation from '@/components/shared/loading_animation'

interface Props {
    admin?: boolean
}

function Audiolist(props: Props) {
    const {
        admin
    } = props

    const [data, setData] = useState([] as Array<ContentData>)
    const [currentData, setCurrentData] = useState({} as ContentData)

    const { isLoading } = useQuery(['audilist'], () => actionService.getservicedata(`/content`,
        {
            limit: 16,
            page: 0,
            type: "AUDIO"
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

    return (
        <div className=' w-full mt-14 pb-20 ' >
            <div className=' w-full flex justify-between items-center ' >
                <CustomText className=' text-[20px] leading-[30px] font-bold ' >Audio Messages</CustomText>
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
            <LoadingAnimation loading={isLoading} length={data?.length} >
                <div className=' w-full grid grid-cols-3 gap-9 mt-8 ' >
                    {data?.map((item: ContentData, index: number) => {
                        return (
                            <div role='button' onClick={() => setCurrentData(item)} key={index} className={` ${item?.url === currentData?.url ? " bg-[#BE0027] text-white " : ""} w-full flex items-center shadow-lg py-2 px-4 rounded-xl gap-[18px] `} >
                                <div className=' w-14 h-14 bg-red-900 rounded-2xl ' >
                                    <img alt='thumbnail' src={item?.thumbnail} className="w-full h-full object-cover rounded-2xl " />
                                </div>
                                <div>
                                    <CustomText className=' leading-[22px] font-medium text-[14px] '  >
                                        {item?.title}
                                    </CustomText>
                                    <CustomText className=' leading-[18px] text-xs ' >
                                        {item?.description}
                                    </CustomText>
                                </div>
                                {admin && (
                                    <> 
                                        {item?.url !== currentData?.url &&
                                            <div className=' ml-auto ' >
                                                <DeleteContent id={item?.id} />
                                            </div>
                                        }
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </LoadingAnimation>
            {currentData?.url && (
                <AudioPlayer data={currentData} />
            )}
        </div>
    )
}

export default Audiolist

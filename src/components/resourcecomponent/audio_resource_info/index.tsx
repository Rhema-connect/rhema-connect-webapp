"use client"
import LoadingAnimation from '@/components/shared/loading_animation'
import AudioPlayer from '@/components/shared/musicplayer'
import CustomText from '@/components/shared/textcomponent'
import actionService from '@/connections/getdataaction'
import { ContentData, IPlaylistData } from '@/models'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

interface Props {
    id?: string | number
}

function AudioResourceInfo(props: Props) {
    const {
        id
    } = props


    const [data, setData] = useState({} as IPlaylistData)
    const [currentData, setCurrentData] = useState({} as ContentData)


    const { isLoading } = useQuery(['playlistlist', id], () => actionService.getservicedata(`/content/playlist/${id}`,
        {
            limit: 20,
            page: 0,
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
        <LoadingAnimation loading={isLoading} >
            <div className=' w-full pt-8 ' >
                <div className=' w-full flex gap-6 pb-[18px] border-b border-[#828282] ' >
                    <div className=' w-[204px] h-[204px] rounded-2xl bg-purple-700 ' >
                        <img alt='thumbnail' src={data?.thumbnail} className="w-full h-full object-cover rounded-2xl " />
                    </div>
                    <div className=' pt-4 ' >
                        <CustomText className=' text-[24px] leading-[36px] font-bold ' >{data?.title}</CustomText>
                        <CustomText className=' leading-[22px] text-sm ' >Playlist ・ {data?.items?.length}</CustomText>
                    </div>
                </div>
                <div className=' w-full pt-8 flex flex-col gap-[18px] ' >
                    <LoadingAnimation loading={false} length={data?.items?.length} >
                        {data?.items?.map((item: ContentData, index: number) => {
                            return (
                                <div key={index} role='button' onClick={() => setCurrentData(item)} className={` ${item?.title === currentData?.title ? " bg-[#828282] " : " "} w-full rounded-[16px] p-3 flex items-center justify-between `} >
                                    <div className=' flex items-center gap-[18px] ' >
                                        <div className=' w-[56px] h-[56px] rounded-2xl bg-slate-950 ' >
                                            <img alt='thumbnail' src={item?.thumbnail} className="w-full h-full object-cover rounded-2xl " />
                                        </div>
                                        <CustomText className=' text-sm font-medium leading-[22px] ' >{item?.title}</CustomText>
                                    </div>
                                    <CustomText className=' text-xs leading-[18px] ' >{item?.author_name}</CustomText>
                                    <CustomText className=' text-xs leading-[18px] ' ></CustomText>
                                </div>
                            )
                        })}
                    </LoadingAnimation>
                </div>
            </div>
            {currentData?.url && (
                <AudioPlayer data={currentData} />
            )}
        </LoadingAnimation>
    )
}

export default AudioResourceInfo

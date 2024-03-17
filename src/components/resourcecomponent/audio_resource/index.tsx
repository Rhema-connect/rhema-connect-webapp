"use client"
import React, { useState } from 'react'
import { Connect, RoundedArrow } from '../../svg'
import PageLayout from '../../pagelayout'
import SearchBar from '../../shared/searchbar'
import CustomText from '../../shared/textcomponent'
import { useRouter } from 'next/navigation'
import { ContentData, IPlaylistData } from '@/models'
import actionService from '@/connections/getdataaction'
import { useQuery } from 'react-query'
import Audiolist from './audio_list'
import AudioPlayer from '@/components/shared/musicplayer'
import LoadingAnimation from '@/components/shared/loading_animation'

interface Props { }

function AudioResource(props: Props) {
    const { } = props

    const router = useRouter()



    const [data, setData] = useState([] as Array<IPlaylistData>)

    const { isLoading } = useQuery(['audiplaylist'], () => actionService.getservicedata(`/content/playlists/all`,
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
                setData(data?.data?.data)
            }
        }
    )

    return (
        <div className=' w-full ' >
            <LoadingAnimation loading={isLoading} length={data?.length} > 
                <div className=' w-full grid md:grid-cols-3 grid-cols-4 gap-4 gap-y-10  ' >
                    {data?.map((item: IPlaylistData, index: number) => {
                        return (
                            <div role='button' key={index} className=' w-full  ' >
                                <div className=' w-full h-[204px] bg-red-900 rounded-2xl ' >
                                    <img alt='thumbnail' src={item?.thumbnail} className="w-full h-full object-cover rounded-2xl " />
                                </div>
                                <CustomText className=' leading-[22px] font-medium text-[14px] mt-4 '  >
                                    {item?.title}
                                </CustomText>
                                <CustomText className=' leading-[18px] text-xs ' >
                                    Playlist ・{item?.items?.length} videos
                                </CustomText>
                            </div>
                        )
                    })}
                </div>
            </LoadingAnimation>
            <Audiolist />
        </div>
    )
}

export default AudioResource

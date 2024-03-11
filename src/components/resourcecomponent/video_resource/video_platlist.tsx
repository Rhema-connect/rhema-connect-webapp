import LoadingAnimation from '@/components/shared/loading_animation';
import { VideoIcon } from '@/components/svg'
import actionService from '@/connections/getdataaction';
import { IPlaylistData } from '@/models';
import { Image } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useQuery } from 'react-query';

interface Props { }

function VideoPlatlist(props: Props) {
    const { } = props

    const [data, setData] = useState([] as Array<IPlaylistData>)


    const { isLoading } = useQuery(['videoplaylist'], () => actionService.getservicedata(`/content/playlists`,
        {
            limit: 10,
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
    
    return (
        <LoadingAnimation loading={isLoading} >
            <div className=' w-full py-4 flex gap-4 ' >
                {data?.slice(0, 2)?.map((item: IPlaylistData, index: number) => {
                    return (
                        <div key={index} className=' w-full flex gap-3 items-center justify-between px-4 shadow-xl py-2 rounded-lg ' >
                            <div className=' flex items-center gap-3 ' >
                                <div className=' w-[56px] h-[56px] bg-slate-600 rounded-xl ' >
                                    <Image width={"full"} height={"full"} rounded={"12px"} alt='playlist' objectFit={"cover"} src={item?.thumbnail} />
                                </div>
                                <div className=' mr-6 ' >
                                    <p className=' font-medium text-[14px] leading-[22px] ' >{item?.title}</p>
                                    <p className=' text-[#637381] text-[12px] leading-[18px] mt-1 ' >Playlist ・{item?.items?.length} videos</p>
                                </div>
                            </div>
                            <VideoIcon />
                        </div>
                    )
                })}
            </div>
        </LoadingAnimation>
    )
}

export default VideoPlatlist

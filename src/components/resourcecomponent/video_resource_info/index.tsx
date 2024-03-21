"use client"
import CustomText from '@/components/shared/textcomponent'
import { BackArrow, CloseIcon, PersonIcon, SendIcon, ThumbsUp } from '@/components/svg'
import React, { useState } from 'react'
import YouTube from 'react-youtube';
import Othervideo from './othervideo';
import actionService from '@/connections/getdataaction';
import { ContentData } from '@/models';
import { useQuery } from 'react-query';
import Comments from './comments';
import LoadingAnimation from '@/components/shared/loading_animation';
import { textLimit } from '@/util/textlimit';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure, DrawerCloseButton } from '@chakra-ui/react';

interface Props {
    id: string
}

function VideoResourceInfo(props: Props) {
    const {
        id
    } = props
 
    const { isOpen, onOpen, onClose } = useDisclosure()

    const opts = {
        height: '477',
        width: '100%', // Set width to 100%
        playerVars: {
            autoplay: 1,
        },
    };


    const onReady = (event: any) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    const [data, setData] = useState({} as ContentData)


    const { isLoading } = useQuery(['videolist', id], () => actionService.getservicedata(`/content/${id}`,
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
                // console.log(data?.data?.data);
                setData(data?.data?.data)
            }
        }
    )

    return (
        <LoadingAnimation loading={isLoading} >
            <div className=' w-full ' >
                <div className=' w-full  flex gap-6  ' >
                    <div className=' w-full h-[477px] rounded-[14px] bg-gray-600 ' >
                        <YouTube style={{ borderRadius: "14px" }} videoId={data?.youtube_url?.slice(data?.youtube_url?.length - 11, data?.youtube_url?.length)} opts={opts} onReady={onReady} />
                    </div>
                    <div className=' w-fit lg:block hidden text-white ' >
                        <div className=' w-[321px] ' >
                            <CustomText className=' font-bold text-lg leading-7 ' >Others also likes</CustomText>
                            <Othervideo />
                        </div>
                    </div>
                </div>
                <div className=' w-full flex gap-6  ' >
                    <div className=' w-full py-6 ' >
                        <div className=' w-full flex items-center justify-between ' >
                            <CustomText className=' leading-[44.8px] text-[32px] font-semibold ' >{textLimit(data?.title ?? "", 20)}</CustomText>
                            <button onClick={onOpen} className=' outline-none font-bold lg:hidden ' >show other video</button>
                        </div>
                        {/* <CustomText className=' text-[#919EAB] leading-[22.4px] mt-[11px] ' >450 views</CustomText> */}
                        <CustomText className=' leading-[22.4px] my-[19px] ' >{data?.description}
                            {/* <span role='button' style={{ color: "#919EAB" }} >more</span> */}
                        </CustomText>
                        <Comments id={id ? id : 0} />
                    </div>

                    <div className=' lg:block hidden w-fit text-white ' >
                        <div className=' w-[321px] ' />
                    </div>
                </div>

                <Drawer onClose={onClose} placement='bottom' size={"md"} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent padding={"0px"} m={"0px"} backgroundColor={"#3b3b3b"} >
                        {/* <DrawerHeader borderBottom={"1px solid #828282"} color={"white"} >Others also likes</DrawerHeader>
                        <DrawerCloseButton onClick={()=> onClose()} color={"white"} /> */}
                        <DrawerBody padding={"0px"} m={"0px"}>
                            <div className=' px-6 flex py-3 flex-col items-center ' >
                                <div className=' bg-[#D9D9D9] h-1 w-[56px] rounded-sm ' />
                                <div className=' mt-4 w-full flex justify-between items-center ' >
                                    <p className=' text-white ' >Others also likes</p>
                                    <button onClick={onClose} >
                                        <CloseIcon />
                                    </button>
                                </div>
                            </div>
                            <div className=' w-full text-white flex flex-col bg-[#3b3b3b] pl-6 ' >
                                {/* <CustomText className=' font-bold text-lg leading-7 ' >Others also likes</CustomText> */}
                                <Othervideo />
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

            </div>
        </LoadingAnimation>
    )
}

export default VideoResourceInfo

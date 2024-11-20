"use client"
import CustomText from '@/components/shared/textcomponent'
import { BackArrow, CloseIcon, PersonIcon, SendIcon, ThumbsUp } from '@/components/svg'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import Othervideo from './othervideo';
import actionService from '@/connections/getdataaction';
import { ContentData } from '@/models';
import { useQuery } from 'react-query';
import Comments from './comments';
import LoadingAnimation from '@/components/shared/loading_animation';
import { textLimit } from '@/util/textlimit';
import ReactPlayer from 'react-player';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure, DrawerCloseButton, Spinner } from '@chakra-ui/react';
import VideoPlayer from '@/components/shared/videoPlayer';

interface Props {
    id: string,
    dashboard?: boolean
}

function VideoResourceInfo(props: Props) {
    const {
        id,
        dashboard
    } = props

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [data, setData] = useState({} as ContentData)
    const [isBuffering, setIsBuffering] = useState(true);
    const [videoError, setVideoError] = useState(false);

    const handleProgress = (state: any) => {
        // Check if video is still buffering 
        if (state.loaded < state.loadedSeconds) {
            setIsBuffering(true);

        } else {
            setIsBuffering(false);
        }
    };



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
                console.log(data?.data?.data);
                setData(data?.data?.data)
            }
        }
    )

    const handleError = (error: any) => {
        console.error('Error playing video:', error);
        setVideoError(true);
    };

    console.log(data?.youtube_url);
    

    return (
        <LoadingAnimation loading={isLoading} >
            <div className={` w-full lg:px-0 ${dashboard ? " text-black " : "text-white"} `} >
                <div className=' w-full  flex gap-6  ' >
                    <div className={` w-full h-[350px] lg:h-[477px] flex justify-center items-center ${dashboard ? "bg-white" : "bg-gray-600"} rounded-[14px]  `} >
                        {/* <LoadingAnimation loading={isBuffering} > */}
                        <div className=' w-full h-full relative ' >
                            {videoError && (
                                <div className={` w-full text-lg   ${dashboard ? "bg-white" : "bg-gray-600"} font-semibold h-full justify-center flex items-center `} >
                                    <p>Error On Video Link</p>
                                </div>
                            )}
                            {!videoError && (
                                <div className=' w-full relative z-30 ' >
                                    <div className=' w-full lg:block hidden ' > 
                                        <VideoPlayer src={data?.youtube_url+""} measureType="px" rounded='16px' height={477} />
                                    </div>
                                    <div className=' w-full lg:hidden ' >
                                        
                                    <VideoPlayer src={data?.youtube_url+""} measureType="px" rounded='16px' height={350} />
                                        {/* /> */}
                                    </div>
                                </div>
                            )}
                            {isBuffering && (
                                <div className=' w-full h-full flex z-10 justify-center items-center absolute inset-0 ' >
                                    <Spinner size={["lg", "md"]} color={'white'} />
                                </div>
                            )}
                        </div>
                        {/* </LoadingAnimation> */}
                    </div>
                    <div className=' w-fit lg:block hidden  ' >
                        <div className=' w-[321px] ' >
                            <CustomText className=' font-bold text-lg leading-7 ' >Others also likes</CustomText>
                            <Othervideo dashboard={dashboard} />
                        </div>
                    </div>
                </div>
                <div className=' w-full flex gap-6  ' >
                    <div className=' w-full py-6 ' >
                        <div className=' w-full flex items-center justify-between ' >
                            <CustomText className=' leading-[44.8px] text-[32px] font-semibold ' >{data?.title}</CustomText>
                        </div>
                        <div className=' w-full flex items-center justify-end ' >
                            <button onClick={onOpen} className=' outline-none font-bold lg:hidden ' >show other video</button>
                        </div>
                        {/* <CustomText className=' text-[#919EAB] leading-[22.4px] mt-[11px] ' >450 views</CustomText> */}
                        <CustomText className=' leading-[22.4px] my-[19px] ' >{data?.description}
                            {/* <span role='button' style={{ color: "#919EAB" }} >more</span> */}
                        </CustomText>
                        <Comments id={id ? id : 0} />
                    </div>

                    <div className=' lg:block hidden w-fit  ' >
                        <div className=' w-[321px] ' />
                    </div>
                </div>

                <Drawer onClose={onClose} placement='bottom' size={"md"} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent roundedTop={"24px"} padding={"0px"} m={"0px"} backgroundColor={"#3b3b3b"} >
                        <DrawerBody roundedTop={"24px"} padding={"0px"} m={"0px"}>
                            <div className=' px-6 flex py-3 flex-col items-center ' >
                                <div className=' bg-[#D9D9D9] h-1 w-[56px] rounded-sm ' />
                                <div className=' mt-4 w-full flex justify-between items-center ' >
                                    <p className='  ' >Others also likes</p>
                                    <button onClick={onClose} >
                                        <CloseIcon />
                                    </button>
                                </div>
                            </div>
                            <div className=' w-full  flex flex-col bg-[#3b3b3b] pl-6 ' >
                                <CustomText className=' font-bold text-lg hidden lg:block leading-7 ' >Others also likes</CustomText>
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

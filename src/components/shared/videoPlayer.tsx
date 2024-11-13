'use client';
import { Box, HStack, VStack } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { Play, Pause, Maximize2, VolumeSlash, VolumeHigh } from 'iconsax-react'
import ReactPlayer from 'react-player';

function VideoPlayer({
    src, width, height, measureType = 'px', rounded = "0px"
}: {
    src: string,
    width?: number;
    height?: number;
    measureType: 'px' | '%',
    rounded?: string
}) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(true);
    const [showControl, setShowControl] = React.useState(true);

    const videoRef: any = useRef<HTMLVideoElement>();
    const boxRef = useRef<HTMLDivElement>();

    // Toggle play/pause state
    const togglePlayPause = (e: any) => {
        e.stopPropagation()
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };

    const toggleMute = (e: any) => {
        e.stopPropagation()
        setIsMuted((prevIsMuted) => !prevIsMuted);
    };

    // Enter fullscreen
    const handleFullScreen = (e: any) => {
        e.stopPropagation()
        const videoElement = videoRef?.current?.getInternalPlayer();
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.webkitRequestFullscreen) {
            // Safari
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.mozRequestFullScreen) {
            // Firefox
            videoElement.mozRequestFullScreen();
        } else if (videoElement.msRequestFullscreen) {
            // IE/Edge
            videoElement.msRequestFullscreen();
        }
    };

    return (
        <Box ref={boxRef as any} bgColor={"gray"} pos={"relative"} onMouseOver={() => setShowControl(true)} onMouseOut={() => setShowControl(false)} width={width ? width : '100%'} height={height ? height : '100%'} maxH={'full'} overflow={'hidden'} rounded={rounded} position={'relative'}>

            <ReactPlayer width={"100%"} height={"100%"} ref={videoRef as any} controls={true}
                muted={isMuted} playing={isPlaying} url={src} />
            <Box pos={"absolute"} inset={"0px"} zIndex={10} />
            {
                showControl && (
                    <HStack width='100%' height={'50px'} justifyContent={'space-between'} bg={'#00000054'} position={'absolute'} bottom={'0'} paddingX='10px' zIndex={20}>
                        <HStack onClick={togglePlayPause} cursor={'pointer'} justifyContent='center' alignItems={'center'} width={'30px'} height={'30px'} borderRadius={'15px'} bg='white'>
                            {!isPlaying && <Play size='20px' variant='Linear' color={"black"} />}
                            {isPlaying && <Pause size='20px' variant='Linear' color={"black"} />}
                        </HStack>

                        <HStack>
                            <HStack marginRight={'10px'} cursor={'pointer'} justifyContent='center' alignItems={'center'} width={'30px'} height={'30px'} borderRadius={'15px'} bg='white'>
                                {isMuted && <VolumeSlash size='20px' variant='Linear' color={"black"} onClick={toggleMute} />}
                                {!isMuted && <VolumeHigh size='20px' variant='Linear' color={"black"} onClick={toggleMute} />}
                            </HStack>
                            <HStack onClick={togglePlayPause} cursor={'pointer'} justifyContent='center' alignItems={'center'} width={'30px'} height={'30px'} borderRadius={'15px'} bg='white'>
                                <Maximize2 onClick={handleFullScreen} size='20px' variant='Linear' color={"black"} />
                            </HStack>
                        </HStack>
                    </HStack>
                )
            }
        </Box>
    )
}

export default VideoPlayer
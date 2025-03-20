"use client";
import { Box, HStack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Play, Pause, Maximize2, VolumeSlash, VolumeHigh } from "iconsax-react";
import ReactPlayer from "react-player";

declare global {
  interface HTMLDivElement {
    webkitRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  }
}

function VideoPlayer({
  src,
  width,
  height,
  measureType = "px",
  rounded = "0px",
  showCustomControl = true,
  reactPlayerControl = false,
}: {
  src: string;
  width?: number;
  height?: number;
  measureType: "px" | "%";
  rounded?: string;
  showCustomControl?: boolean;
  reactPlayerControl?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControl, setShowControl] = useState(true);

  const boxRef = useRef<HTMLDivElement>(null);

  // Toggle play/pause state
  const togglePlayPause = (e: any) => {
    e.stopPropagation();
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const toggleMute = (e: any) => {
    e.stopPropagation();
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };



  const handleFullScreen = (e: any) => {
    e.stopPropagation();
    const container = boxRef.current;
  
    if (document.fullscreenElement) {
      // If fullscreen is active, exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        // Safari
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        // Firefox
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        // IE/Edge
        (document as any).msExitFullscreen();
      }
    } else {
      // If not fullscreen, request fullscreen
      if (container) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if ((container as any).webkitRequestFullscreen) {
          // Safari
          (container as any).webkitRequestFullscreen();
        } else if ((container as any).mozRequestFullScreen) {
          // Firefox
          (container as any).mozRequestFullScreen();
        } else if ((container as any).msRequestFullscreen) {
          // IE/Edge
          (container as any).msRequestFullscreen();
        }
      }
    }
  };
  

  return (
    <Box
      ref={boxRef}
      bgColor={"gray"}
      pos={"relative"}
      onMouseOver={() => setShowControl(true)}
      onMouseOut={() => setShowControl(true)}
      width={width ? `${width}${measureType}` : "100%"}
      height={height ? `${height}${measureType}` : "100%"}
      maxH={"full"}
      overflow={"hidden"}
      rounded={rounded}
      position={"relative"}
    >
      <ReactPlayer
        width={"100%"}
        height={"100%"}
        controls={reactPlayerControl}
        muted={isMuted}
        playing={reactPlayerControl ? true : isPlaying}
        url={src}
      />
      {showCustomControl && <Box pos={"absolute"} inset={"0px"} zIndex={10} />}
      {showControl && showCustomControl && (
        <HStack
          width="100%"
          height={"50px"}
          justifyContent={"space-between"}
          bg={"#00000054"}
          position={"absolute"}
          bottom={"0"}
          paddingX="10px"
          zIndex={20}
        >
          <HStack
            onClick={togglePlayPause}
            cursor={"pointer"}
            justifyContent="center"
            alignItems={"center"}
            width={"30px"}
            height={"30px"}
            borderRadius={"15px"}
            bg="white"
          >
            {!isPlaying && <Play size="20px" variant="Linear" color={"black"} />}
            {isPlaying && <Pause size="20px" variant="Linear" color={"black"} />}
          </HStack>

          <HStack>
            <HStack
              marginRight={"10px"}
              cursor={"pointer"}
              justifyContent="center"
              alignItems={"center"}
              width={"30px"}
              height={"30px"}
              borderRadius={"15px"}
              bg="white"
            >
              {isMuted && (
                <VolumeSlash
                  size="20px"
                  variant="Linear"
                  color={"black"}
                  onClick={toggleMute}
                />
              )}
              {!isMuted && (
                <VolumeHigh
                  size="20px"
                  variant="Linear"
                  color={"black"}
                  onClick={toggleMute}
                />
              )}
            </HStack>
            <HStack
              cursor={"pointer"}
              justifyContent="center"
              alignItems={"center"}
              width={"30px"}
              height={"30px"}
              borderRadius={"15px"}
              bg="white"
            >
              <Maximize2
                onClick={handleFullScreen}
                size="20px"
                variant="Linear"
                color={"black"}
              />
            </HStack>
          </HStack>
        </HStack>
      )}
    </Box>
  );
}

export default VideoPlayer;
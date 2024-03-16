import { ContentData } from '@/models';
import React, { useState, useRef, useEffect } from 'react';
import { FaPause, FaPlay } from "react-icons/fa";
import CustomText from '../textcomponent';

interface IProps {
  data?: ContentData
}

const AudioPlayer = (props: IProps) => {

  const {
    data
  } = props

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentMusic, setCurrentMusic] = useState("");
  const [duration, setDuration] = useState(0); 
  const audioRef: any = useRef(null);

  const playMusic = (musicUrl: any) => {
    setCurrentMusic(musicUrl);
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: any) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time: any) => {
    const currentMinutes = Math.floor(time / 60);
    const currentSeconds = Math.floor(time % 60);
    return `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
  };

  useEffect(() => {
    setCurrentMusic(data?.url ? data?.url : "");
    audioRef.current.play();
    setIsPlaying(true);
  }, [data?.url])

  return (
    <div className=' shadow-lg fixed bottom-4 inset-x-4 flex flex-col items-center gap-2 pb-2 px-4 bg-[#3B3B3B] h-fit rounded-lg ' >

      <input
        type="range"
        value={currentTime}
        max={duration || 0}
        onChange={handleSeek}
        className=' bg-slate-500 w-full '
      />
      <div className=' w-full text-white flex justify-between items-center gap-8 ' >
        <div className=' flex items-center gap-4 ' >
          <div className=' w-14 h-14 rounded-lg bg-slate-600 ' >
            <img alt='thumbnail' src={data?.thumbnail} className="w-full h-full object-cover rounded-lg " />
          </div>
          <div>
            <CustomText className=' font-medium text-[14px] '  >
              {data?.title}
            </CustomText>
            {data?.description && (
              <CustomText className=' leading-[18px] text-xs ' >
                {data?.description?.length > 15 ? data?.description?.slice(0, 15) + "..." : data?.description}
              </CustomText>
            )}
          </div>
        </div>
        <div className=' flex items-center gap-8 ' >
          <button onClick={togglePlay} className=' outline-none ' >
            {!isPlaying ?
              <FaPlay size={"20px"} /> :
              <FaPause size={"20px"} />
            }
          </button>
        </div>

        <div className=' font-medium text-[14px] ' >{formatTime(currentTime)}/ {formatTime(duration)}</div>

        <audio
          ref={audioRef}
          src={currentMusic}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          preload="auto"
          autoPlay
        >
          <source src={currentMusic} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;

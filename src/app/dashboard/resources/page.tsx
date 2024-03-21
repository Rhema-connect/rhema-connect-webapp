"use client"
import CreatePlaylist from '@/components/resourcecomponent/create_playlist'
import CreateVideoBtn from '@/components/resourcecomponent/create_video'
import VideoResource from '@/components/resourcecomponent/video_resource'
import VideoPlatlist from '@/components/resourcecomponent/video_resource/video_platlist'
import CustomButton from '@/components/shared/custom_button'
import { AddIcon, VideoIcon } from '@/components/svg'
import React from 'react'

interface Props { }

function Resources(props: Props) {
    const { } = props

    return (
        <div className=' w-full h-full text-[#212B36] pb-6 flex flex-col ' >
            <div className=' w-full flex pb-4 justify-between items-center ' >
                <p className=' font-bold text-[24px] leading-[36px] text-black ' >Playlist</p>
                <div className=' flex items-center gap-3 ' >
                    <CreatePlaylist typeinfo="VIDEO" />
                    <CreateVideoBtn />
                </div>
            </div>
            <VideoPlatlist />
            <div className=' w-full pt-4 ' >
                <p className=' font-bold text-[24px] leading-[36px] mb-4 text-black ' >Videos</p>
                <VideoResource admin={true} />
                <div className=' h-12 ' />
            </div>
        </div>
    )
}

export default Resources

"use client"
import AudioResource from '@/components/resourcecomponent/audio_resource' 
import CreateAudioBtn from '@/components/resourcecomponent/create_audio'
import CreatePlaylist from '@/components/resourcecomponent/create_playlist'
import CustomButton from '@/components/shared/custom_button'
import { AddIcon } from '@/components/svg'
import React from 'react'

interface Props {}

function Audio(props: Props) {
    const {} = props

    return (
        
        <div className=' w-full h-full text-[#212B36] pb-6 flex flex-col ' >
            <div className=' w-full flex pb-4 justify-between items-center ' >
                <p className=' font-bold text-[24px] leading-[36px] text-black ' >Playlist</p>
                <div className=' flex items-center gap-3 ' >
                    <CreatePlaylist typeinfo="AUDIO" />
                    <CreateAudioBtn />
                </div>
            </div> 
            <div className=' w-full pt-4 ' > 
                <AudioResource />
                <div className=' h-12 ' />
            </div>
        </div>
    )
}

export default Audio

import AudioResourceInfo from '@/components/resourcecomponent/audio_resource_info'
import React from 'react' 

function AudioInfo({ params }: { params: { slug: string } }) { 

    return (
        <div className=' w-full text-white ' >
            <AudioResourceInfo id={params?.slug} />
        </div>
    )
}

export default AudioInfo

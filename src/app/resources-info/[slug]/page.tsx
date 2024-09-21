import VideoResourceInfo from '@/components/resourcecomponent/video_resource_info'
import React from 'react'

function VideoPage({ params }: { params: { slug: string } }) { 

    return (
        <VideoResourceInfo id={params?.slug}  />
    )
}

export default VideoPage

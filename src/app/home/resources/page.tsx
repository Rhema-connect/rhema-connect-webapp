"use client"
import VideoResource from '@/components/resourcecomponent/video_resource'
import checkdata from '@/store/checklang';
import React, { useEffect } from 'react'

interface Props {}

function Resoures(props: Props) {
    const {} = props

    const { check, setCheck } = checkdata((state) => state);

    useEffect(()=> {
        if(check){ 
            (window as any).location.reload()
        }
        setCheck("")
    }, [])
    
    return ( 
        <VideoResource /> 
    )
}

export default Resoures

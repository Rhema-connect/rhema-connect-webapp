"use client"
import VideoResource from '@/components/resourcecomponent/video_resource'
import React, { useEffect } from 'react'

interface Props {}

function Resoures(props: Props) {
    const {} = props


    let lang = localStorage.getItem("lang")?.toString()

    useEffect(()=> {
        if(lang !== "true"){ 
            (window as any).location.reload()
        }
        localStorage.setItem("lang", "true")
    }, [])
    
    return ( 
        <VideoResource /> 
    )
}

export default Resoures

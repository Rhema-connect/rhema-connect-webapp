import { AudioIcon, BookIcon, TrashIcon, UploadIcon, VideoMp4Icon } from '@/components/svg'
import React, { useState } from 'react'
import CustomText from '../textcomponent'
import { Image, useToast } from '@chakra-ui/react'

interface Props {
    type?: "video" | "audio" | "book",
    setImageFiles?: any,
    initial?: string
}

function CustomFilePicker(props: Props) {
    const {
        type,
        setImageFiles,
        initial
    } = props

    const [imageView, setImageView] = useState({} as any)
    const toast = useToast()

    const handleImageChange = (e: any) => {

        const selected: any = e.target.files[0];
        console.log(selected);


        const TYPES_Book = ["application/pdf"];
        const TYPES_Audio = ["audio/mpeg"];
        const TYPES_Video = ["video/x-matroska", "video/mp4", "image/jpeg"];

        if (selected?.size > 32295253) {
            toast({
                title: "Size Should Not Be Above 30MB",
                status: "error",
                duration: 3000,
                position: "top",
            });

            return
        } else if (type === "video" && selected && TYPES_Video.includes(selected.type)) {
            setImageFiles(selected)
            setImageView(selected)
            console.log(selected);

        } else if (type === "audio" && selected && TYPES_Audio.includes(selected.type)) {
            setImageFiles(selected)
            setImageView(selected)
            console.log(selected);

        } else if (type === "book" && selected && TYPES_Book.includes(selected.type)) {
            setImageFiles(selected)
            setImageView(selected)
            console.log(selected);

        } else {
            if (type === "book") {
                toast({
                    title: "Accepts Only PDF",
                    status: "error",
                    duration: 3000,
                    position: "top",
                });
            } else if (type === "audio") {
                toast({
                    title: "Accepts Only MP3",
                    status: "error",
                    duration: 3000,
                    position: "top",
                });
            }
            console.log('Error')
        }


    }

    return (
        <div>
            {(!imageView?.name && !initial) && (
                <label role='button' className=' border-[#919EAB52] border rounded-lg h-[126px] flex flex-col justify-center items-center ' >
                    <input accept="video" onChange={handleImageChange} className=' hidden ' type="file" />
                    <UploadIcon />
                    <CustomText className=" text-sm font-semibold leading-5 text-[#BE0027] " >Click to upload <span className=' text-[#475467] font-normal ' >or drag and drop</span></CustomText>
                    <CustomText className=" text-xs leading-[18px] text-[#475467] " >{type === "audio" ? "MP3" : "PDF"} (max. 30MB)</CustomText>
                </label>

            )}
            {(imageView?.name || initial) && (
                <label role='button' className=' relative border-[#919EAB52] border rounded-lg h-[72px] flex px-4 justify-between items-center ' >
                    <input multiple={false} onChange={handleImageChange} className=' hidden ' type="file" />
                    <div className=' flex items-center gap-3 ' >
                        {type === "video" && (
                            <VideoMp4Icon />
                        )}
                        {type === "audio" && (
                            <AudioIcon />
                        )}
                        {type === "book" && (
                            <BookIcon />
                        )}
                        <div>
                            <p className=' text-[14px] text-[#344054] leading-[20px] font-medium ' >{(imageView?.name ? imageView?.name : initial)?.length < 30 ? (imageView?.name ? imageView?.name : initial) : (imageView?.name ? imageView?.name : initial)?.slice(0, 30) + "..."}</p>
                            {(imageView?.size) && (
                                <p className=' text-[14px] leading-[20px] text-[#475467] ' >{imageView?.size / 1000} KB</p>
                            )}
                        </div>
                    </div>
                    <TrashIcon />
                    {/* <Image alt='image' width={"full"} h={"148px"} rounded={"lg"} src={imageView} position={"absolute"} inset={"0px"} />
                    <CustomButton width={"fit-content"} backgroundColor={"transparent"} border={"1px solid #fff"} px={"10px"} height={"30px"} text={"Change thumbnail"} fontWeight={"700"} fontSize={"13px"} lineHeight={"22px"} /> */}
                </label>
            )}
        </div>
    )
}

export default CustomFilePicker
import { ImageIcon } from '@/components/svg'
import React, { useState } from 'react'
import CustomText from '../textcomponent'
import { Image, Input, Toast, useToast } from '@chakra-ui/react'
import CustomButton from '../custom_button'

interface Props {
    initial?: string
    setImage?: any
}

function CustomUploader(props: Props) {
    const {
        initial,
        setImage
    } = props

    const toast = useToast()
    const [imageView, setImageView] = useState("")

    const handleImageChange = (e: any) => {

        const selected:any  = e.target.files[0]; 
        
        const TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        
        if(selected?.size > 5000000){ 
            toast({
                title: "Image Should Not Be Above 5MB",
                status: "error",
                duration: 3000,
                position: "top",
            });

            return
        } else if (selected && TYPES.includes(selected.type)) {
            setImage(selected)
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setImageView(reader.result)
            }
            reader.readAsDataURL(selected)
        } else {
            toast({
                title: "Accepts PNG, JPG, JPEG and WEBP",
                status: "error",
                duration: 3000,
                position: "top",
            });
        }
    }

    return (
        <>
            {(!imageView && !initial) && ( 
                <label role='button' className=' border-[#919EAB52] border rounded-lg h-[148px] flex flex-col justify-center items-center ' >
                    <input onChange={handleImageChange} className=' hidden '  type="file" />
                    <ImageIcon />
                    <CustomText className=" text-[#132A00] text-xs leading-[18px] " >Drop your image here, or <span className=' text-[#1F4690] ' >browse</span></CustomText>
                    <CustomText className=" text-[#637381] text-[8px] leading-[12px] " >Supports: PNG, JPG, JPEG, WEBP</CustomText>
                </label>
            )}
            {((imageView || initial)) && (
                <label role='button' className=' relative border-[#919EAB52] border rounded-lg h-[148px] flex flex-col justify-center items-center ' >
                    <input multiple={false} onChange={handleImageChange} className=' hidden z-30 ' type="file" />
                    <Image alt='image' width={"full"} h={"148px"} rounded={"lg"} objectFit={"cover"} src={imageView ? imageView : initial} position={"absolute"} zIndex={"10"} inset={"0px"}  />
                    <div className=' bg-black bg-opacity-15 w-full h-full absolute inset-0 rounded-lg z-20 ' />
                    <CustomButton width={"fit-content"} backgroundColor={"transparent"} zIndex={"30"} border={"1px solid #fff"} px={"10px"} height={"30px"} text={"Change thumbnail"} fontWeight={"700"} fontSize={"13px"} lineHeight={"22px"}  />
                </label>
            )}
        </>
    )
}

export default CustomUploader

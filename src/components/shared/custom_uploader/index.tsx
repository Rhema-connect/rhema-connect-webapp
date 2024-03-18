import { ImageIcon } from '@/components/svg'
import React, { useState } from 'react'
import CustomText from '../textcomponent'
import { Image, Input } from '@chakra-ui/react'
import CustomButton from '../custom_button'

interface Props {
    setImage?: any
}

function CustomUploader(props: Props) {
    const {
        setImage
    } = props

    const [imageView, setImageView] = useState("")

    const handleImageChange = (e: any) => {

        const selected:any  = e.target.files[0];
        const TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        if (selected && TYPES.includes(selected.type)) {
            setImage(selected)
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setImageView(reader.result)
            }
            reader.readAsDataURL(selected)
        } else {
            console.log('Error')
        }
    }

    return (
        <>
            {!imageView && ( 
                <label role='button' className=' border-[#919EAB52] border rounded-lg h-[148px] flex flex-col justify-center items-center ' >
                    <input onChange={handleImageChange} className=' hidden '  type="file" />
                    <ImageIcon />
                    <CustomText className=" text-[#132A00] text-xs leading-[18px] " >Drop your image here, or <span className=' text-[#1F4690] ' >browse</span></CustomText>
                    <CustomText className=" text-[#637381] text-[8px] leading-[12px] " >Supports: PNG, JPG, JPEG, WEBP</CustomText>
                </label>
            )}
            {imageView && (
                <label role='button' className=' relative border-[#919EAB52] border rounded-lg h-[148px] flex flex-col justify-center items-center ' >
                    <input multiple={false} onChange={handleImageChange} className=' hidden ' type="file" />
                    <Image alt='image' width={"full"} h={"148px"} rounded={"lg"} src={imageView} position={"absolute"} inset={"0px"}  />
                    <CustomButton width={"fit-content"} backgroundColor={"transparent"} border={"1px solid #fff"} px={"10px"} height={"30px"} text={"Change thumbnail"} fontWeight={"700"} fontSize={"13px"} lineHeight={"22px"}  />
                </label>
            )}
        </>
    )
}

export default CustomUploader

import AudioResource from '@/components/resourcecomponent/audio_resource'
import BookResource from '@/components/resourcecomponent/book_resource'
import CreateBookBtn from '@/components/resourcecomponent/create_book'
import CustomButton from '@/components/shared/custom_button'
import { AddIcon } from '@/components/svg'
import React from 'react'

interface Props {}

function Books(props: Props) {
    const {} = props

    return (
        <div className=' w-full h-full text-[#212B36] pb-6 flex flex-col ' >
            <div className=' w-full flex pb-4 justify-between items-center ' >
                <p className=' font-bold text-[24px] leading-[36px] text-black ' >Pdfs/Books</p>
                <div className=' flex items-center gap-3 ' > 
                    <CreateBookBtn />
                </div>
            </div> 
            <div className=' w-full pt-6 ' > 
                <BookResource />
                <div className=' h-12 ' />
            </div>
        </div>
    )
}

export default Books

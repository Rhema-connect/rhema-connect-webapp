import CustomButton from '@/components/shared/custom_button' 
import ModalLayout from '@/components/shared/modal_layout' 
import { AddIcon } from '@/components/svg' 
import React, { useState } from 'react' 
import PlaylistForm from './playlist_form'

interface Props {
    typeinfo?: "VIDEO" | "AUDIO"
}

function CreatePlaylist(props: Props) {
    const {
        typeinfo
    } = props

    const [open, setOpen] = useState(false)    

    return (
        <>
            <CustomButton onClick={() => setOpen(true)} width={"fit-content"} icon={<AddIcon color='#212B36' />} text={"Create Playlist"} secondary={true} />
            <ModalLayout open={open} close={()=> setOpen(false)} title={""} size={"md"} >
                <PlaylistForm typeinfo={typeinfo} setOpen={setOpen} />
            </ModalLayout>
        </>
    )
}

export default CreatePlaylist

import CustomButton from '@/components/shared/custom_button'
import CustomUploader from '@/components/shared/custom_uploader'
import InputComponent from '@/components/shared/inputcomponent'
import ModalLayout from '@/components/shared/modal_layout'
import CustomText from '@/components/shared/textcomponent'
import { AddIcon } from '@/components/svg'
import { useCreatePlaylistCallback, useUploaderCallback } from '@/connections/useaction'
import { CreatePlaylistData } from '@/models'
import { useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import * as yup from 'yup'
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
            <ModalLayout open={open} close={setOpen} title={""} size={"md"} >
                <PlaylistForm typeinfo={typeinfo} setOpen={setOpen} />
            </ModalLayout>
        </>
    )
}

export default CreatePlaylist

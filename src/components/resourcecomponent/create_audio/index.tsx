import CustomButton from '@/components/shared/custom_button' 
import { AddIcon } from '@/components/svg' 
import React, { useState } from 'react' 
import Audioform from './audioform'

interface Props { 
}

function CreateAudioBtn(props: Props) {
    const { } = props

    const [open, setOpen] = useState(false)

    return (
        <>
            <CustomButton onClick={() => setOpen(true)} width={"fit-content"} icon={<AddIcon />} text={"Add New"} secondary={false} />
            <Audioform open={open} setOpen={setOpen} />
        </>
    )
}

export default CreateAudioBtn

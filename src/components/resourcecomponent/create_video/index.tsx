import CustomButton from '@/components/shared/custom_button' 
import { AddIcon } from '@/components/svg' 
import React, { useState } from 'react' 
import Videoform from './videoform'

interface Props { }

function CreateVideoBtn(props: Props) {
    const { } = props

    const [open, setOpen] = useState(false) 
 
    return (
        <>
            <CustomButton onClick={() => setOpen(true)} width={"fit-content"} icon={<AddIcon />} text={"Add New"} secondary={false} />
            <Videoform open={open} setOpen={setOpen} />
        </>
    )
}

export default CreateVideoBtn

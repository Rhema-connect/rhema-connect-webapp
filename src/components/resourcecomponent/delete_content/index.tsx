import ModalLayout from '@/components/shared/modal_layout'
import CustomText from '@/components/shared/textcomponent'
import { useDeleteContentCallback } from '@/connections/useaction'
import { useToast, Flex, Button, Image } from '@chakra-ui/react'
// import { Box } from 'framer-motion'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

interface Props {
    id?: string | number
}

export default function DeleteContent(props: Props) {

    const {
        id
    } = props

    const [open, setOpen] = useState(false)
    const toast = useToast()
    // const navigate = useNavigate()

    const queryClient = useQueryClient()

    const { handleDeleteContent } = useDeleteContentCallback()

    //API call to handle adding user
    const deleteMutation = useMutation(async () => {

        let response = await handleDeleteContent(id ? id : "");

        if (response?.status === 201 || response?.status === 200) {

            toast({
                title: response?.data?.message,
                status: "success",
                duration: 3000,
                position: "top",
            });

            setOpen(false)

            queryClient.invalidateQueries(['videolist'])
            queryClient.invalidateQueries(['audilist'])
            queryClient.invalidateQueries(['bookslist'])
            
            return response;
        } else if (response?.data?.statusCode === 400) {
            toast({
                title: response?.data?.message,
                status: "error",
                duration: 3000,
                position: "top",
            });
            return
        }
    });

    const submit = async () => {

        deleteMutation.mutateAsync()
            .catch(() => {
                toast({
                    title: "Something went wrong",
                    status: "error",
                    duration: 3000,
                    position: "top",
                });
            });
    }

    const openHandler =(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.stopPropagation()
        setOpen(true)
    }

    return (
        <>
            <button onClick={(e) => openHandler(e)} className=' w-5 ' >
                <Image src='/images/trash.png' alt='trash' />
            </button>
            <ModalLayout size={"md"} open={open} close={setOpen} title={"Delete Content"} >
                <div className=' w-full flex flex-col justify-center items-center ' >
                    <Image src='/images/trash.png' width={"100px"} alt='trash' />
                    <CustomText className=' mt-4 font-medium ' >Are You sure You want to delete this Content?</CustomText>
                    <div className=' w-full flex flex-col justify-center gap-3 mt-8 ' >
                        <Button variant={'outline'} outlineColor={'#1F7CFF'} borderWidth={'0px'} width='100%' height={'32px'} color='#1F7CFF' onClick={() => setOpen(false)} >Cancel</Button>
                        <Button onClick={() => submit()}
                            isLoading={deleteMutation?.isLoading} isDisabled={deleteMutation?.isLoading} 
                            variant={'solid'} bg='red' width='100%' height={'40px'} color='white' >Delete</Button>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
} 
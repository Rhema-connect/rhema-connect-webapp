import ModalLayout from '@/components/shared/modal_layout'
import CustomText from '@/components/shared/textcomponent'
import { useDeleteContentCallback, useDeletePlaylistCallback } from '@/connections/useaction'
import { useToast, Flex, Button, Image } from '@chakra-ui/react'
// import { Box } from 'framer-motion'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

interface Props {
    id?: string | number,
    type?: "Content" | "Playlist",
    text?: boolean,
    refetch?: any
}

export default function DeleteContent(props: Props) {

    const {
        id,
        text,
        type,
        refetch
    } = props

    const [open, setOpen] = useState(false)
    const toast = useToast()
    // const navigate = useNavigate()

    const queryClient = useQueryClient()

    const { handleDeleteContent } = useDeleteContentCallback()
    const { handleDeletePlaylist } = useDeletePlaylistCallback()    

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
            queryClient.invalidateQueries(['videoplaylist'])     
            refetch()       

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

    //API call to handle adding user
    const deletePlaylistMutation = useMutation(async () => {

        let response = await handleDeletePlaylist(id ? id : "");

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
            queryClient.invalidateQueries(['videoplaylist'])   
            refetch()                

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

        if(type === "Content") {
            deleteMutation.mutateAsync()
                .catch(() => {
                    toast({
                        title: "Something went wrong",
                        status: "error",
                        duration: 3000,
                        position: "top",
                    });
                });
        } else {
            deletePlaylistMutation.mutateAsync()
                .catch(() => {
                    toast({
                        title: "Something went wrong",
                        status: "error",
                        duration: 3000,
                        position: "top",
                    });
                });
        }

    }

    const openHandler = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(e) {
            e.stopPropagation()
        }
        setOpen(true)
    }

    return (
        <>
            {text && (
                <button onClick={(e) => openHandler(e)}  className=' h-5 text-red-600 text-left ' >
                    Delete
                </button>
            )}
            {!text && (
                <button onClick={(e) => openHandler(e)} className=' w-5 ' >
                    <Image src='/images/trash.png' alt='trash' />
                </button>
            )}
            <ModalLayout size={"sm"} open={open} close={()=> setOpen(false)}>
                <div className=' w-full flex flex-col justify-center items-center ' >

                    <Image alt='delete' src='/images/deleteaccount.svg' />
                    <CustomText className=" text-[24px] font-bold mt-3 " >Delete {type} </CustomText>
                    <CustomText className=" text-center text-gray-600 font-medium " color='grey'>Are you sure you want to delete this {type} ? this action cannot be undone.</CustomText>
                    <div className=' w-full flex flex-col justify-center gap-3 mt-6 ' >
                        <Button variant={'outline'} outlineColor={'#1F7CFF'} borderWidth={'0px'}  height={'32px'} color='#1F7CFF' onClick={() => setOpen(false)} >Cancel</Button>
                        <Button onClick={() => submit()}
                            isLoading={deleteMutation?.isLoading || deletePlaylistMutation?.isLoading}  isDisabled={deleteMutation?.isLoading || deletePlaylistMutation?.isLoading}
                            variant={'solid'} bg='red'  height={'40px'} color='white' >Delete</Button>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
} 
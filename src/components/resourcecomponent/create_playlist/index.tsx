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

interface Props {
    typeinfo?: "VIDEO" | "AUDIO"
}

function CreatePlaylist(props: Props) {
    const {
        typeinfo
    } = props

    const [open, setOpen] = useState(false)
    const [imageFile, setImageFIle] = useState("")
    const toast = useToast()

    const queryClient = useQueryClient()

    const { handleCreatePlaylist } = useCreatePlaylistCallback()
    const { handleUploader } = useUploaderCallback()


    const loginSchema = yup.object({
        title: yup.string().required('Required'),
    })

    // formik
    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });

    //API call to handle adding user
    const createPlayistMutation = useMutation(async (formData: CreatePlaylistData) => {
        const response = await handleCreatePlaylist(formData);

        console.log(response?.data);

        if (response?.status === 201 || response?.status === 200) {

            toast({
                title: response?.data?.message,
                status: "success",
                duration: 3000,
                position: "top",
            });

            queryClient.invalidateQueries(['usertable'])

            return response;
        } else if (response?.data?.statusCode === 400) {
            toast({
                title: response?.data?.message,
                status: "error",
                duration: 3000,
                position: "top",
            });
            return
        } else {
            toast({
                title: "Something went wrong",
                status: "error",
                duration: 3000,
                position: "top",
            });
            return
        }
    });

    //API call to handle adding user
    const uploaderMutation = useMutation(async (userdata: CreatePlaylistData) => {

        let formData = new FormData()
        formData.append("file", imageFile)

        const response = await handleUploader(formData, imageFile);

        console.log(response);


        if (response?.status === 201 || response?.status === 200) {  

            createPlayistMutation.mutateAsync({ ...userdata, thumbnail: response?.data }, {
                onSuccess: (data: any) => {
                    if (data) {
                        setOpen(false)
                    }
                },
            })
                .catch(() => {
                    toast({
                        title: "Something went wrong",
                        status: "error",
                        duration: 3000,
                        position: "top",
                    });
                });


            return response;
        } else if (response?.data?.statusCode === 400) {
            toast({
                title: response?.data?.message,
                status: "error",
                duration: 3000,
                position: "top",
            });
            return
        } else {
            toast({
                title: "Something went wrong",
                status: "error",
                duration: 3000,
                position: "top",
            });
            return
        }
    });

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formik.dirty || !formik.isValid) {
            toast({
                title: "You have to fill in the form to continue",
                status: "error",
                duration: 3000,
                position: "top",
            });
            return;
        } else if (!imageFile) {
            toast({
                title: "Add a Thumbnail",
                status: "error",
                duration: 3000,
                position: "top",
            });
            return;
        }


        const userData = {
            title: formik.values.title,
            type: typeinfo ? typeinfo : ""
        };

        uploaderMutation.mutateAsync(userData)
            .catch(() => {
                toast({
                    title: "Something went wrong",
                    status: "error",
                    duration: 3000,
                    position: "top",
                });
            });

    }


    return (
        <>
            <CustomButton onClick={() => setOpen(true)} width={"fit-content"} icon={<AddIcon color='#212B36' />} text={"Create Playlist"} secondary={true} />
            <ModalLayout open={open} close={setOpen} title={""} size={"md"} >
                <form onSubmit={submit} className=' w-full ' >
                    <CustomText className=" font-bold text-[18px] leading-[28px] text-[#212B36] " >Create a new Playlist</CustomText>
                    <CustomText className=" text-xs leading-[18px] text-[#637381] " >Create and edit playlist for content organization.</CustomText>
                    <div className=' w-full mt-6 ' >
                        <CustomText className=" text-xs leading-[18px] mb-2 text-[#919EAB] " >Title</CustomText>
                        <InputComponent 
                            name="title"
                            onChange={formik.handleChange}
                            onFocus={() =>
                                formik.setFieldTouched("title", true, true)
                            }
                            touch={formik.touched.title}
                            error={formik.errors.title} type='text' placeholder="Add Title" />
                    </div>
                    <div className=' w-full mt-4 ' >
                        <CustomText className=" text-xs leading-[18px] mb-2 text-[#212B36] " >Upload thumbnail</CustomText>
                        <CustomUploader setImage={setImageFIle} />
                    </div>
                    <div className=' w-full gap-4 flex mt-6 ' >
                        <CustomButton text={"Cancel"} secondary={true} onClick={() => setOpen(false)} />
                        <CustomButton isLoading={uploaderMutation?.isLoading || createPlayistMutation?.isLoading} disabled={(uploaderMutation?.isLoading || createPlayistMutation?.isLoading || !formik.dirty || !formik.isValid)} type="submit" text={"Create Playlist"} secondary={false} />
                    </div>
                </form>
            </ModalLayout>
        </>
    )
}

export default CreatePlaylist

import CustomButton from '@/components/shared/custom_button'
import CustomFilePicker from '@/components/shared/custom_file_picker'
import CustomUploader from '@/components/shared/custom_uploader'
import InputComponent from '@/components/shared/inputcomponent'
import ModalLayout from '@/components/shared/modal_layout'
import CustomText from '@/components/shared/textcomponent'
import { AddIcon } from '@/components/svg'
import { useCreateContentCallback, useCreatePlaylistCallback, useUploaderCallback, useupdatePlaylistCallback } from '@/connections/useaction'
import { ContentData, CreatePlaylistData, IPlaylistData } from '@/models'
import { Checkbox, Select, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import * as yup from 'yup'
import PlaylistSelector from '../playlist_selector'

interface Props { }

function CreateAudioBtn(props: Props) {
    const { } = props

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)

    const [imageFile, setImageFIle] = useState("")
    const [playlist, setPlaylistId] = useState("" as string | number)
    const [videoFile, setVideoFile] = useState("")
    const toast = useToast()

    const queryClient = useQueryClient()

    const { handleCreateContent } = useCreateContentCallback()
    const { handleUploader } = useUploaderCallback()
    const { handleupdatePlaylist } = useupdatePlaylistCallback()


    const loginSchema = yup.object({
        title: yup.string().required('Required'),
        description: yup.string().required('Required'),
        author_name: yup.string().required('Required'),
    })

    // formik
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            author_name: "",
            content_type: "AUDIO",
        },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });

    //API call to handle adding user
    const createPlayistMutation = useMutation(async (formData: ContentData) => {
        const response = await handleCreateContent(formData);

        if (response?.status === 201 || response?.status === 200) {

            toast({
                title: response?.data?.message,
                status: "success",
                duration: 3000,
                position: "top",
            });

            queryClient.invalidateQueries(['audilist'])
            queryClient.invalidateQueries(['audiplaylist'])
            
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
    const uploaderMutation = useMutation(async (userdata: ContentData) => {

        let formData = new FormData()
        formData.append("file", imageFile)

        const response = await handleUploader(formData, imageFile);


        if (response?.status === 201 || response?.status === 200) {

            audioMutation.mutateAsync({ ...userdata, thumbnail: response?.data }, {
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

    //API call to handle adding user
    const audioMutation = useMutation(async (userdata: ContentData) => {

        let formData = new FormData()
        formData.append("file", videoFile)

        const response = await handleUploader(formData, videoFile);

        if (response?.status === 201 || response?.status === 200) {



            if (playlist) {

                addToPlaylistMutation.mutateAsync({ ...userdata, url: response?.data}, {
                    onSuccess: (data: any) => {
                        setOpen(false)
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
            } else {

                createPlayistMutation.mutateAsync({ ...userdata, url: response?.data }, {
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
            }

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
    const addToPlaylistMutation = useMutation(async (userdata: ContentData) => {

        const response = await handleupdatePlaylist(userdata, playlist);

        if (response?.status === 201 || response?.status === 200) {

            toast({
                title: response?.data?.message,
                status: "success",
                duration: 3000,
                position: "top",
            });

            queryClient.invalidateQueries(['audilist'])
            queryClient.invalidateQueries(['audiplaylist'])

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
            ...formik?.values,
            isDraft: false
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

    const closeHandler = () => {
        setOpen(false)
        setShow(false)
    }

    return (
        <>
            <CustomButton onClick={() => setOpen(true)} width={"fit-content"} icon={<AddIcon />} text={"Add New"} secondary={false} />
            <ModalLayout open={open} close={closeHandler} title={""} size={"md"} >
                <form onSubmit={(e) => submit(e)} className=' w-full ' >
                    <CustomText className=" font-bold text-[18px] leading-[28px] text-[#212B36] " >Upload Audio</CustomText>
                    <CustomText className=" text-xs leading-[18px] text-[#637381] " >Upload resources and select which playlist if needed</CustomText>
                    <div className=' w-full mt-6 ' >
                        <CustomFilePicker type="audio" setImageFiles={setVideoFile} />
                    </div>
                    <div className=' w-full mt-6 ' >
                        <CustomText className=" text-xs leading-[18px] mb-2 text-[#919EAB] " >Title</CustomText>
                        <InputComponent
                            name="title"
                            onChange={formik.handleChange}
                            onFocus={() =>
                                formik.setFieldTouched("title", true, true)
                            }
                            touch={formik.touched.title}
                            error={formik.errors.title}
                            type='text' placeholder="Add Title" />
                    </div>
                    <div className=' w-full mt-4 ' >
                        <CustomText className=" text-xs leading-[18px] mb-2 text-[#919EAB] " >Author Name</CustomText>
                        <InputComponent
                            name="author_name"
                            onChange={formik.handleChange}
                            onFocus={() =>
                                formik.setFieldTouched("author_name", true, true)
                            }
                            touch={formik.touched.author_name}
                            error={formik.errors.author_name}
                            type='text' placeholder="Add Author Name" />
                    </div>
                    <div className=' w-full mt-4 ' >
                        <CustomText className=" text-xs leading-[18px] mb-2 text-[#919EAB] " >Description</CustomText>
                        <InputComponent
                            name="description"
                            textarea={true}
                            onChange={formik.handleChange}
                            onFocus={() =>
                                formik.setFieldTouched("description", true, true)
                            }
                            touch={formik.touched.description}
                            error={formik.errors.description}
                            type='text' placeholder="Description" />
                    </div>
                    <div className=' w-full mt-4 flex gap-2 ' >
                        <Checkbox checked={show} onChange={(e) => setShow(e.target.checked)} />
                        <CustomText className=" text-sm leading-[22px] text-[#212B36] " >Add to playlist</CustomText>
                    </div>
                    {show && (
                        <div className=' w-full mt-4 ' >
                            <CustomText className=" text-xs leading-[18px] mb-1 text-[#919EAB] " >Select Playlist</CustomText>
                            <PlaylistSelector
                                setPlaylistId={setPlaylistId}
                                type="AUDIO" />
                        </div>
                    )}
                    <div className=' w-full mt-4 ' >
                        <CustomText className=" text-xs leading-[18px] mb-1 text-[#212B36] " >Upload thumbnail</CustomText>
                        <CustomUploader setImage={setImageFIle} />
                    </div>
                    <div className=' w-full gap-4 flex mt-6 ' >
                        <CustomButton text={"Cancel"} secondary={true} />
                        <CustomButton type="submit" isLoading={createPlayistMutation?.isLoading || uploaderMutation?.isLoading || audioMutation?.isLoading} disable={createPlayistMutation?.isLoading || uploaderMutation?.isLoading || audioMutation?.isLoading} text={"Create Audio"} secondary={false} />
                    </div>
                </form>
            </ModalLayout>
        </>
    )
}

export default CreateAudioBtn

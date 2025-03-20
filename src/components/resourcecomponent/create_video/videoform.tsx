import CustomButton from '@/components/shared/custom_button'
import CustomUploader from '@/components/shared/custom_uploader'
import InputComponent from '@/components/shared/inputcomponent'
import ModalLayout from '@/components/shared/modal_layout'
import CustomText from '@/components/shared/textcomponent'
import { Checkbox, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import PlaylistSelector from '../playlist_selector'
import * as yup from 'yup'
import { useupdatePlaylistCallback, useCreateContentCallback, useUploaderCallback, useUpdateContentCallback } from '@/connections/useaction'
import { ContentData } from '@/models'
import { useFormik } from 'formik'
import { useQueryClient, useMutation } from 'react-query'

interface IProps {
    open: boolean,
    setOpen: (by: boolean) => void
    edit?: boolean,
    data?: ContentData
}

export default function Videoform(props: IProps) {

    const {
        open,
        setOpen,
        edit,
        data
    } = props

    const [show, setShow] = useState(false)
    const [playlist, setPlaylistId] = useState("" as string | number)

    const [imageFile, setImageFIle] = useState("")
    const { handleupdatePlaylist } = useupdatePlaylistCallback()
    const { handleUpdateContent } = useUpdateContentCallback()

    const toast = useToast()

    const queryClient = useQueryClient()

    const { handleCreateContent } = useCreateContentCallback()
    const { handleUploader } = useUploaderCallback()


    const loginSchema = yup.object({
        title: yup.string().required('required'),
        description: yup.string().required('required'),
        youtube_url: yup.string().required('required'),
    })

    useEffect(() => {
        if (edit) {
            formik.setFieldValue("title", data?.title)
            formik.setFieldValue("description", data?.description)
            formik.setFieldValue("content_type", data?.content_type)
            formik.setFieldValue("youtube_url", data?.youtube_url)
        }
    }, [data])

    // formik
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            content_type: "AUDIO",
            youtube_url: "",
        },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });

    //API call to handle adding user
    const createVideoMutation = useMutation(async (formData: ContentData) => {

        const response = await handleCreateContent(formData);

        if (response?.status === 201 || response?.status === 200) {

            toast({
                title: response?.data?.message,
                status: "success",
                duration: 3000,
                position: "top",
            });

            setOpen(false)

            queryClient.invalidateQueries(['videolist'])

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

            queryClient.invalidateQueries(['videolist'])
            queryClient.invalidateQueries(['videoplaylist'])

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
    const updateContentMutation = useMutation(async (userdata: ContentData) => {

        const response = await handleUpdateContent(userdata, data?.id ?? "");

        if (response?.status === 201 || response?.status === 200) {

            toast({
                title: response?.data?.message,
                status: "success",
                duration: 3000,
                position: "top",
            });

            queryClient.invalidateQueries(['videolist'])
            queryClient.invalidateQueries(['videoplaylist'])

            setOpen(false)

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

            if(edit) {
                updateContentMutation.mutateAsync({ ...userdata, thumbnail: response?.data }, {
                    onSuccess: () => {
                        // if (data) {
                            setOpen(false)
                        // }
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
            } else if (playlist) {

                addToPlaylistMutation.mutateAsync({ ...userdata, thumbnail: response?.data }, {
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

                createVideoMutation.mutateAsync({ ...userdata, thumbnail: response?.data }, {
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

            createVideoMutation.mutateAsync({ ...userdata, thumbnail: "/images/thumnail.jpg" }, {
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
            
            // toast({
            //     title: "Something went wrong",
            //     status: "error",
            //     duration: 3000,
            //     position: "top",
            // });
            // return

            
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
        }


        const userData = {
            ...formik?.values,
            isDraft: false,
            content_type: "VIDEO"
        };

        const updateData = {
            ...formik?.values,
            isDraft: false,
            content_type: "VIDEO",
            thumbnail: data?.thumbnail,

        };

        if (edit) {

            if (!imageFile) {
                updateContentMutation.mutateAsync(updateData)
                    .catch(() => {
                        toast({
                            title: "Something went wrong",
                            status: "error",
                            duration: 3000,
                            position: "top",
                        });
                    });
            } else {
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
        } else {
            uploaderMutation.mutateAsync(userData)
            .catch(() => {
                toast({
                    title: "Something went wrong",
                    status: "error",
                    duration: 3000,
                    position: "top",
                });
            });
            // if (!imageFile) {
            //     toast({
            //         title: "Add a Thumbnail",
            //         status: "error",
            //         duration: 3000,
            //         position: "top",
            //     });
            //     return;
            // } else {
            //     uploaderMutation.mutateAsync(userData)
            //         .catch(() => {
            //             toast({
            //                 title: "Something went wrong",
            //                 status: "error",
            //                 duration: 3000,
            //                 position: "top",
            //             });
            //         });
            // }
        }

    }

    return (
        <ModalLayout open={open} close={()=> setOpen(false)} title={""} size={"md"} >
            <form onSubmit={(e) => submit(e)} className=' w-full ' >
                <CustomText className=" font-bold text-[18px] leading-[28px] text-[#212B36] " >Upload Videos</CustomText>
                <CustomText className=" text-xs leading-[18px] text-[#637381] " >Upload resources and select which playlist if needed</CustomText>

                <div className=' w-full mt-6 ' >
                    <CustomText className=" text-xs leading-[18px] mb-2 text-[#919EAB] " >Video Url</CustomText>
                    <InputComponent
                        name="youtube_url"
                        onChange={formik.handleChange}
                        onFocus={() =>
                            formik.setFieldTouched("youtube_url", true, true)
                        }
                        value={formik.values.youtube_url}
                        touch={formik.touched.youtube_url}
                        error={formik.errors.youtube_url}
                        type='text' placeholder="Add Video" />
                </div>
                <div className=' w-full mt-6 ' >
                    <CustomText className=" text-xs leading-[18px] mb-2 text-[#919EAB] " >Title</CustomText>
                    <InputComponent
                        name="title"
                        onChange={formik.handleChange}
                        onFocus={() =>
                            formik.setFieldTouched("title", true, true)
                        }
                        value={formik.values.title}
                        touch={formik.touched.title}
                        error={formik.errors.title}
                        type='text' placeholder="Add Title" />
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
                        value={formik.values.description}
                        touch={formik.touched.description}
                        error={formik.errors.description}
                        type='text' placeholder="Description" />
                </div>
                {!edit && (
                    <div className=' w-full mt-4 flex gap-2 ' >
                        <Checkbox checked={show} onChange={(e) => setShow(e.target.checked)} />
                        <CustomText className=" text-sm leading-[22px] text-[#212B36] " >Add to playlist</CustomText>
                    </div>
                )}
                {show && (
                    <div className=' w-full mt-4 ' >
                        <CustomText className=" text-xs leading-[18px] mb-1 text-[#919EAB] " >Select Playlist</CustomText>
                        <PlaylistSelector
                            setPlaylistId={setPlaylistId}
                            type="VIDEO" />
                    </div>
                )}
                <div className=' w-full mt-4 ' >
                    <CustomText className=" text-xs leading-[18px] mb-1 text-[#212B36] " >Upload thumbnail</CustomText>
                    <CustomUploader initial={data?.thumbnail ?? ""} setImage={setImageFIle} />
                </div>
                <div className=' w-full gap-4 flex mt-6 ' >
                    <CustomButton onClick={() => setOpen(false)} text={"Cancel"} secondary={true} />
                    <CustomButton type="submit" isDisabled={uploaderMutation?.isLoading || createVideoMutation.isLoading || updateContentMutation?.isLoading} isLoading={uploaderMutation?.isLoading || createVideoMutation.isLoading || updateContentMutation?.isLoading} text={edit ? "Edit Video" : "Create Video"} secondary={false} />
                </div>
            </form>
        </ModalLayout>
    )
}

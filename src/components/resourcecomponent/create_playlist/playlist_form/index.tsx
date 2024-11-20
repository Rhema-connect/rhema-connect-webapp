import CustomButton from '@/components/shared/custom_button'
import CustomUploader from '@/components/shared/custom_uploader'
import InputComponent from '@/components/shared/inputcomponent'
import CustomText from '@/components/shared/textcomponent'
import { useCreatePlaylistCallback, useUploaderCallback, useupdatePlaylistCallback, useupdatePlaylistDetailsCallback } from '@/connections/useaction'
import { CreatePlaylistData, IPlaylistData } from '@/models'
import { useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import * as yup from 'yup'

interface Props {
    typeinfo?: "VIDEO" | "AUDIO",
    setOpen?: any,
    edit?: boolean,
    data?: IPlaylistData
}

export default function PlaylistForm(props: Props) {
    const {
        typeinfo,
        setOpen,
        edit,
        data
    } = props

    const toast = useToast()

    const queryClient = useQueryClient()
    const [imageFile, setImageFIle] = useState("")

    const { handleCreatePlaylist } = useCreatePlaylistCallback()
    const { handleUploader } = useUploaderCallback()
    const { handleupdatePlaylistDetails } = useupdatePlaylistDetailsCallback()



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

    useEffect(() => {
        if (edit) {
            formik.setFieldValue("title", data?.title)
        }
    }, [data])

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

 
            queryClient.refetchQueries(['videoplaylist'])
            queryClient.invalidateQueries(['audiplaylist'])
            queryClient.invalidateQueries(['videolist'])
            queryClient.invalidateQueries(['audilist'])
            queryClient.invalidateQueries(['bookslist'])
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
    const updatePlayistMutation = useMutation(async (formData: CreatePlaylistData) => {
        const response = await handleupdatePlaylistDetails(formData, data?.id + "");


        console.log(response?.data);

        if (response?.status === 201 || response?.status === 200) {
 
            queryClient.refetchQueries(['videoplaylist'])
            queryClient.invalidateQueries(['audiplaylist'])
            queryClient.invalidateQueries(['videolist'])
            queryClient.invalidateQueries(['audilist'])
            queryClient.invalidateQueries(['bookslist'])
            queryClient.invalidateQueries(['videoplaylist'])      

            toast({
                title: response?.data?.message,
                status: "success",
                duration: 3000,
                position: "top",
            });
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
    },
);

    //API call to handle adding user
    const uploaderMutation = useMutation(async (userdata: CreatePlaylistData) => {

        let formData = new FormData()
        formData.append("file", imageFile)

        const response = await handleUploader(formData, imageFile);
 

        if (response?.status === 201 || response?.status === 200) {

            if (edit) {

                updatePlayistMutation.mutateAsync({ ...userdata, thumbnail: response?.data })
                    .catch(() => {
                        toast({
                            title: "Something went wrong",
                            status: "error",
                            duration: 3000,
                            position: "top",
                        });
                    });
            } else {

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
        } else if (!imageFile && !edit) {
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
            type: typeinfo ? typeinfo : "", 
        };

        const updateData = {
            title: formik.values.title,
            type: typeinfo ? typeinfo : "", 
            thumbnail: data?.thumbnail
        };

        if (edit) {
            if (imageFile) {
                uploaderMutation.mutateAsync(userData)
                    .catch(() => {
                        toast({
                            title: "Something went wrong",
                            status: "error",
                            duration: 3000,
                            position: "top",
                        });
                    });
            } else {
                updatePlayistMutation.mutateAsync(updateData)
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
        }

    }

    return (
        <form onSubmit={submit} className=' w-full ' >
            <CustomText className=" font-bold text-[18px] leading-[28px] text-[#212B36] " >{edit ? "Edit" : "Create  a new "} Playlist</CustomText>
            <CustomText className=" text-xs leading-[18px] text-[#637381] " >Create and edit playlist for content organization.</CustomText>
            <div className=' w-full mt-6 ' >
                <CustomText className=" text-xs leading-[18px] mb-2 text-[#919EAB] " >Title</CustomText>
                <InputComponent
                    name="title"
                    value={formik?.values.title}
                    onChange={formik.handleChange}
                    onFocus={() =>
                        formik.setFieldTouched("title", true, true)
                    }
                    touch={formik.touched.title}
                    error={formik.errors.title} type='text' placeholder="Add Title" />
            </div>
            <div className=' w-full mt-4 ' >
                <CustomText className=" text-xs leading-[18px] mb-2 text-[#212B36] " >Upload thumbnail</CustomText>
                <CustomUploader initial={data?.thumbnail} setImage={setImageFIle} />
            </div>
            <div className=' w-full gap-4 flex mt-6 ' >
                <CustomButton text={"Cancel"} secondary={true} onClick={() => setOpen(false)} />
                <CustomButton isLoading={uploaderMutation?.isLoading || createPlayistMutation?.isLoading || updatePlayistMutation?.isLoading} disabled={(uploaderMutation?.isLoading || createPlayistMutation?.isLoading || !formik.dirty || !formik.isValid || updatePlayistMutation?.isLoading)} type="submit" text={edit ? "Update Playlist" : "Create Playlist"} secondary={false} />
            </div>
        </form>
    )
}

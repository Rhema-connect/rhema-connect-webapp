import CustomButton from '@/components/shared/custom_button'
import CustomFilePicker from '@/components/shared/custom_file_picker'
import CustomUploader from '@/components/shared/custom_uploader'
import InputComponent from '@/components/shared/inputcomponent'
import ModalLayout from '@/components/shared/modal_layout'
import CustomText from '@/components/shared/textcomponent'
import { useCreateBookCallback, useUpdateContentCallback, useUploaderCallback } from '@/connections/useaction'
import { ContentData } from '@/models'
import { useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import * as yup from 'yup'

interface IProps {
    open: boolean,
    setOpen: (by: boolean) => void
    edit?: boolean,
    data?: ContentData
}

export default function Bookform(props: IProps) {

    const {
        open,
        setOpen,
        edit,
        data
    } = props

    const [imageFile, setImageFIle] = useState("")
    const [videoFile, setVideoFile] = useState("")
    const toast = useToast()

    const queryClient = useQueryClient()

    const { handleCreateBook } = useCreateBookCallback()
    const { handleUpdateContent } = useUpdateContentCallback()
    const { handleUploader } = useUploaderCallback()


    const loginSchema = yup.object({
        title: yup.string().required('Required'),
        author_name: yup.string().required('Required'),
        description: yup.string().required('Required'),
    })


    useEffect(() => {
        if (edit) {
            formik.setFieldValue("title", data?.title)
            formik.setFieldValue("description", data?.description)
            formik.setFieldValue("author_name", data?.author_name)
        }
    }, [data])

    // formik
    const formik = useFormik({
        initialValues: {
            title: "",
            author_name: "",
            description: "",
            content_type: "BOOK",
        },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });

    //API call to handle adding user
    const createBookMutation = useMutation(async (formData: ContentData) => {
        const response = await handleCreateBook(formData);

        if (response?.status === 201 || response?.status === 200) {

            toast({
                title: response?.data?.message,
                status: "success",
                duration: 3000,
                position: "top",
            });

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

            bookMutation.mutateAsync({ ...userdata, thumbnail: response?.data }, {
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
    const bookMutation = useMutation(async (userdata: ContentData) => {

        let formData = new FormData()
        formData.append("file", videoFile)

        const response = await handleUploader(formData, videoFile);

        if (response?.status === 201 || response?.status === 200) {

            if (edit) {
 
                updateContentMutation.mutateAsync({ ...userdata, url: response?.data })
                    .catch(() => {
                        toast({
                            title: "Something went wrong",
                            status: "error",
                            duration: 3000,
                            position: "top",
                        });
                    });
            } else {

                createBookMutation.mutateAsync({ ...userdata, url: response?.data }, {
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
    const updateContentMutation = useMutation(async (userdata: ContentData) => {

        const response = await handleUpdateContent(userdata, data?.id ?? "");

        if (response?.status === 201 || response?.status === 200) {

            toast({
                title: response?.data?.message,
                status: "success",
                duration: 3000,
                position: "top",
            });

            queryClient.invalidateQueries(['bookslist'])

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
        };

        const updateData = {
            ...formik?.values,
            isDraft: false,
            url: data?.url,
            thumbnail: data?.thumbnail
        };

        if (edit) {
            if (imageFile) {
                uploaderMutation.mutateAsync(updateData)
                    .catch(() => {
                        toast({
                            title: "Something went wrong",
                            status: "error",
                            duration: 3000,
                            position: "top",
                        });
                    });
            } else if (videoFile) { 
                bookMutation.mutateAsync(updateData)
                    .catch(() => {
                        toast({
                            title: "Something went wrong",
                            status: "error",
                            duration: 3000,
                            position: "top",
                        });
                    });
            } else {
                updateContentMutation.mutateAsync(updateData)
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
        <ModalLayout open={open} close={setOpen} title={""} size={"md"} >
            <form onSubmit={(e) => submit(e)} className=' w-full ' >
                <CustomText className=" font-bold text-[18px] leading-[28px] text-[#212B36] " >Upload Book</CustomText>
                <CustomText className=" text-xs leading-[18px] text-[#637381] " >Upload resources </CustomText>
                <div className=' w-full mt-6 ' >
                    <CustomFilePicker initial={data?.url} type="book" setImageFiles={setVideoFile} />
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
                <div className=' w-full mt-6 ' >
                    <CustomText className=" text-xs leading-[18px] mb-2 text-[#919EAB] " >Author Name</CustomText>
                    <InputComponent
                        name="author_name"
                        onChange={formik.handleChange}
                        onFocus={() =>
                            formik.setFieldTouched("author_name", true, true)
                        }
                        value={formik.values.author_name}
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
                        value={formik.values.description}
                        touch={formik.touched.description}
                        error={formik.errors.description}
                        type='text' placeholder="Description" />
                </div>
                <div className=' w-full mt-4 ' >
                    <CustomText className=" text-xs leading-[18px] mb-1 text-[#212B36] " >Upload thumbnail</CustomText>
                    <CustomUploader initial={data?.thumbnail} setImage={setImageFIle} />
                </div>
                <div className=' w-full gap-4 flex mt-6 ' >
                    <CustomButton onClick={() => setOpen(false)} text={"Cancel"} secondary={true} />
                    <CustomButton type="submit" isLoading={createBookMutation?.isLoading || uploaderMutation?.isLoading || bookMutation?.isLoading || updateContentMutation?.isLoading} disable={createBookMutation?.isLoading || uploaderMutation?.isLoading || bookMutation?.isLoading || updateContentMutation?.isLoading} text={edit ? "Edit Book" : "Create Book"} secondary={false} />
                </div>
            </form>
        </ModalLayout>
    )
}

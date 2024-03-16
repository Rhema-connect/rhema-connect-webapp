import LoadingAnimation from '@/components/shared/loading_animation'
import CustomText from '@/components/shared/textcomponent'
import { PersonIcon, SendIcon, ThumbsUp } from '@/components/svg'
import actionService from '@/connections/getdataaction'
import { useAddCommentsCallback } from '@/connections/useaction'
import { CommentData } from '@/models'
import { Spinner, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import * as yup from 'yup'

interface Props {
    id: string | number
}

function Comments(props: Props) {
    const {
        id
    } = props

    const { handleAddComments } = useAddCommentsCallback()
    const [data, setData] = useState([] as Array<CommentData>) 

    const { isLoading, refetch, isRefetching } = useQuery(['comment'], () => actionService.getservicedata(`/content/comments/${id}`,),
        {
            onError: (error: any) => {
                console.error(error);
            },
            onSuccess: (data: any) => {
                console.log(data?.data?.data);
                setData(data?.data?.data)
            }
        }
    ) 

    const CommentData = (props: CommentData) => {
        return (
            <div className=' w-full flex ' >
                <div className=' pb-6 border-b border-[#828282] w-full flex gap-[25px] ' >
                    <div className=' w-fit ' >
                        <div className=' w-[48px] h-[48px] rounded-full bg-slate-900 ' />
                    </div>
                    <div className=' pt-2 w-full ' >
                        <div className=' flex gap-3 items-center ' >
                            <CustomText className=' leading-[24px] font-medium ' >{props?.name}</CustomText>
                            <CustomText className=' leading-[22px] text-[#707070] text-sm ' >2 days ago</CustomText>
                        </div>
                        <CustomText className=' leading-[24px] mt-3 ' >{props?.comment}</CustomText>
                    </div>
                    <div className=' w-fit flex gap-[13px]  ' >
                        <div role='button' className=' w-[45px] h-[45px] rounded-full flex justify-center items-center border border-white ' >
                            <ThumbsUp />
                        </div>
                        <div role='button' className=' w-[45px] -rotate-180 h-[45px] rounded-full flex justify-center items-center border border-[#919EAB] ' >
                            <ThumbsUp color='#919EAB' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    const loginSchema = yup.object({
        name: yup.string().required('required'),
        comment: yup.string().required('required'),
    })

    // formik
    const formik = useFormik({
        initialValues: {
            name: "",
            comment: "",
            content_id: Number(id)
        },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });

    const toast = useToast()

    //API call to handle adding user
    const addCommentsMutation = useMutation(async (data: CommentData) => {

        const response = await handleAddComments(data, Number(id));

        if (response?.status === 201 || response?.status === 200) {

            toast({
                title: "Added",
                status: "success",
                duration: 3000,
                position: "top",
            });

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


    const submit = async () => {

        if (!formik.dirty || !formik.isValid) {
            toast({
                title: "You have to fill in the form to continue",
                status: "error",
                duration: 3000,
                position: "top",
            });
            return;
        }


        const formdata = {
            ...formik?.values,
        };

        addCommentsMutation.mutateAsync(formdata)
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
        <div className=' w-full ' >
            <CustomText className=' leading-[28px] font-bold text-lg ' >{data?.length} comments</CustomText>
            <input
                name="name"
                onChange={formik.handleChange}
                onFocus={() =>
                    formik.setFieldTouched("name", true, true)
                } placeholder='Enter Name' className={` bg-transparent mt-6 w-full px-4 ${formik?.errors?.name ? "border-[#E84545]" : "border-[#828282] "}   border rounded-[8px] outline-none py-2 `} />
            <div className=' w-full mt-4 px-[25px] py-[21px] flex items-center justify-between border border-[#828282] rounded-[14px] ' >

                <div className=' w-full flex items-center gap-[25px]  ' >
                    <PersonIcon />
                    <input
                        name="comment"
                        onChange={formik.handleChange}
                        onFocus={() =>
                            formik.setFieldTouched("comment", true, true)
                        } placeholder='Add a comment' className={` bg-transparent  ${formik?.errors?.comment ? " placeholder:text-[#E84545]  " : " "}  w-full px-4 outline-none py-2 `} />
                </div>
                <button onClick={() => submit()} className=' outline-none ' >
                    {addCommentsMutation?.isLoading ?
                        <Spinner size={"sm"} color='white' />
                        :
                        <SendIcon />
                    }
                </button>
            </div>
            <div className=' w-full py-9 flex flex-col gap-5  ' >
                <LoadingAnimation loading={isLoading} length={data?.length} refeching={isRefetching} >
                    <>
                        {data?.map((item: CommentData, index: number) => {
                            return (
                                <CommentData key={index} {...item} />
                            )
                        })}
                    </>
                </LoadingAnimation>
            </div>
            {/* <div className=' w-full flex justify-center items-center ' >
                <button className=' outline-none rounded-[50px] bg-transparent border border-[#4D4D4D] h-[52px] px-4 flex items-center justify-center gap-2 ' >
                    <CustomText className=' leading-6 text-white ' >See all</CustomText>
                    <div className=' -rotate-90 ' >
                        <BackArrow />
                    </div>
                </button>
            </div> */}
        </div>
    )
}

export default Comments

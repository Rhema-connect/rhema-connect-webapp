"use client"
import CustomButton from '@/components/shared/custom_button'
import InputComponent from '@/components/shared/inputcomponent'
import { BackIcon, EyeIcon } from '@/components/svg'
import { LoginDataType, useLoginCallback } from '@/connections/useauth'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useMutation } from 'react-query'

interface Props { }

function Auth(props: Props) {
    const { } = props
    const toast = useToast()
    const navigate = useRouter()
    const { handleLogin } = useLoginCallback();
    const loginSchema = yup.object({
        email: yup.string().email('This email is not valid').required('Your email is required'),
        password: yup.string().required('Your password is required').min(6, 'A minimium of 6 characters')
    })

    // formik
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });

    //API call to handle user login
    const loginMutation = useMutation(async (formData: LoginDataType) => {
        const response = await handleLogin(formData);

        if (response?.status === 201 || response?.status === 200) {

            toast({
                title: "Login Successful",
                status: "success",
                duration: 3000,
                position: "top",
            });

            localStorage.setItem("token", response.data?.data?.token);
            localStorage.setItem("id", response?.data?.data?.user?.id); 

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
                position: "bottom",
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

        const loginData = {
            email: formik.values.email.toLocaleLowerCase().trim(),
            password: formik.values.password,
        };

        loginMutation.mutateAsync(loginData, {
            onSuccess: (data: any) => {
                if (data) { 
                    console.log(data);
                    
                    // navigate.push("/dashboard")
                    navigate?.push("/dashboard/resources")
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

    return (
        <div className=' w-full pt-10 flex justify-center items-center h-full text-[#212B36]  ' >
            <div className=' max-w-[460px]  w-full ' >
                <div className=' flex gap-2 items-center '  >
                    <BackIcon />
                    <p className=' leading-6 ' >Go back</p>
                </div>
                <p className=' text-[24px] leading-9 mt-4 font-bold ' >Sign in</p>
                <p className=' text-sm text-[#637381] ' >Sign into your account </p>
                <form onSubmit={(e)=> submit(e)} className=' w-full mt-6 flex flex-col gap-4 ' >
                    <div className=' w-full ' >
                        <p className=' font-medium text-sm mb-2 ' >Email</p>
                        <InputComponent InputComponent
                            name="email"
                            onChange={formik.handleChange}
                            onFocus={() =>
                                formik.setFieldTouched("email", true, true)
                            }
                            touch={formik.touched.email}
                            error={formik.errors.email}
                            type='email' placeholder="Enter email address" />
                    </div>
                    <div className=' w-full ' >
                        <p className=' font-medium text-sm mb-2 ' >Password</p>
                        <InputComponent
                            name="password"
                            onChange={formik.handleChange}
                            onFocus={() =>
                                formik.setFieldTouched("password", true, true)
                            }
                            right={true}
                            touch={formik.touched.password}
                            error={formik.errors.password}
                            type='password' rightIcon={<EyeIcon />} placeholder="Enter password" />
                    </div>
                    <div className=' mt-4 w-full ' >
                        <CustomButton isLoading={loginMutation?.isLoading} disable={loginMutation?.isLoading || !formik.dirty || !formik.isValid } type='submit' text={"Sign in"} secondary={false} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth

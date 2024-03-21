"use client"
import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import InputComponent from '@/components/shared/inputcomponent';
import { EyeIcon } from '@/components/svg';
import CustomButton from '@/components/shared/custom_button';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { PasswordData } from '@/models';
import { useupdatePasswordCallback } from '@/connections/useaction';

export default function Password() {

    const toast = useToast()
    const navigate = useRouter()
    const loginSchema = yup.object({
        confirmPassword: yup.string().required('Your password is required').min(6, 'A minimium of 6 characters'),
        password: yup.string().required('Your password is required').min(6, 'A minimium of 6 characters'),
        oldPasswword: yup.string().required('Your password is required').min(6, 'A minimium of 6 characters'),
    })

    let userid = localStorage.getItem("id")?.toString()

    const { handleupdatePassword } = useupdatePasswordCallback()

    // formik
    const formik = useFormik({
        initialValues: { confirmPassword: '', password: '', oldPasswword: "" },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });


    //API call to handle user login
    const passwordMutation = useMutation(async (formData: PasswordData) => {
        const response = await handleupdatePassword(formData, Number(userid));

        if (response?.status === 201 || response?.status === 200) {
            console.log(response?.data);
            
            toast({
                title: response?.data?.message,
                status: "success",
                duration: 3000,
                position: "top",
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

        const passwordData = {
            ...formik.values
        };

        passwordMutation.mutateAsync(passwordData, {
            onSuccess: (data: any) => {
                if (data) {
                    formik?.setValues({ confirmPassword: '', password: '', oldPasswword: "" })
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
        <div className=' pr-6 pb-5 w-full ' >
            <div className=' px-6 pb-6 pt-2 w-full bg-white shadow-sm rounded-lg text-black ' >
                <div className=' w-full h-[50px] flex items-center border-b border-[#DFE3E8] ' >
                    <p className=' leading-[30px] text-[20px] font-bold ' >Change Password</p>
                </div>
                <div className=' w-full flex justify-center ' >
                    <form onSubmit={(e)=> submit(e)} className=' w-full lg:w-[80%] flex gap-4 flex-col pt-6 ' >
                        <div className=' w-full ' >
                            <p className=' font-medium text-sm mb-2 ' >Old Password</p>
                            <InputComponent
                                name="oldPasswword"
                                onChange={formik.handleChange}
                                onFocus={() =>
                                    formik.setFieldTouched("oldPasswword", true, true)
                                }
                                value={formik?.values?.oldPasswword}
                                right={true}

                        autoComplete="off"
                                touch={formik.touched.oldPasswword}
                                error={formik.errors.oldPasswword}
                                type='password' rightIcon={<EyeIcon />} placeholder="Enter Password" />
                        </div>
                        <div className=' w-full ' >
                            <p className=' font-medium text-sm mb-2 ' >New Password</p>
                            <InputComponent
                                name="password"
                                onChange={formik.handleChange}
                                onFocus={() =>
                                    formik.setFieldTouched("password", true, true)
                                }
                                autoComplete="off"
                                value={formik?.values?.password}
                                right={true}
                                touch={formik.touched.password}
                                error={formik.errors.password}
                                type='password' rightIcon={<EyeIcon />} placeholder="Enter password" />
                        </div>
                        <div className=' w-full ' >
                            <p className=' font-medium text-sm mb-2 ' >Confirm Password</p>
                            <InputComponent
                                name="confirmPassword"
                                onChange={formik.handleChange}
                                onFocus={() =>
                                    formik.setFieldTouched("confirmPassword", true, true)
                                }
                                autoComplete="off"
                                value={formik?.values?.confirmPassword}
                                right={true}
                                touch={formik.touched.confirmPassword}
                                error={formik.errors.confirmPassword}
                                type='password' rightIcon={<EyeIcon />} placeholder="Enter password" />
                        </div>
                        <div className=' mt-4 w-[150px] ' >
                            <CustomButton isLoading={passwordMutation?.isLoading} disable={passwordMutation?.isLoading || !formik.dirty || !formik.isValid} type='submit' text={"Save Password"} secondary={false} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

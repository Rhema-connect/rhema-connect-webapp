"use client"
import React from 'react'
import { useFormik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import * as yup from 'yup'
import InputComponent from '@/components/shared/inputcomponent';
import { Select, useToast } from '@chakra-ui/react';
import { SignUpDataType, useCreateAdmiinCallback } from '@/connections/useauth';
import CustomButton from '@/components/shared/custom_button';
import { EyeIcon } from '@/components/svg';
import { useRouter } from 'next/navigation';

export default function page() {

    const toast = useToast()

    const { handleCreateAdmin } = useCreateAdmiinCallback()

    const router = useRouter()

    const loginSchema = yup.object({
        email: yup.string().email('This email is not valid').required('Your email is required'),
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        // middleName: yup.string().required('Required'),
        password: yup.string().required('Required'),
        gender: yup.string().required('Required'),
        phone: yup.number().required('Required')
    })

    // formik
    const formik = useFormik({
        initialValues: { firstName: '', lastName: '', middleName: '', email: '', gender: '', phone: "", password: "" },
        validationSchema: loginSchema,
        onSubmit: (data) => {
            createAdminMutation.mutate({ ...data })
        },
    });


    //API call to handle adding user
    const createAdminMutation = useMutation(async (formData: SignUpDataType) => {
        const response = await handleCreateAdmin(formData);

        if (response?.status === 201 || response?.status === 200) {

            toast({
                title: response?.data?.message,
                status: "success",
                duration: 3000,
                position: "top",
            });
            router?.refresh()
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

    return (
        <div className=' pr-6 pb-5 w-full  ' >
            <div className=' px-6 pb-6 pt-2 w-full bg-white shadow-sm rounded-lg text-black ' >
                <div className=' w-full h-[50px] flex items-center border-b border-[#DFE3E8] ' >
                    <p className=' leading-[30px] text-[20px] font-bold ' >Add Admin</p>
                </div>
                <div className=' w-full flex justify-center ' >
                    <div className=' w-full lg:w-[80%] flex gap-4 flex-col pt-6 ' >
                        <div className=' w-full ' >
                            <p className=' font-medium text-sm mb-2 ' >First Name </p>
                            <InputComponent InputComponent
                                name="firstName"
                                value={formik?.values?.firstName}
                                onChange={formik.handleChange}
                                onFocus={() =>
                                    formik.setFieldTouched("firstName", true, true)
                                }
                                touch={formik.touched.firstName}
                                error={formik.errors.firstName}
                                type='firstName' placeholder="Enter FirstName" />
                        </div>
                        <div className=' w-full flex flex-col items-center gap-4  ' >
                            <div className=' w-full ' >
                                <p className=' font-medium text-sm mb-2 ' >Middle Name</p>
                                <InputComponent InputComponent
                                    name="middleName"
                                    onChange={formik.handleChange}
                                    value={formik?.values?.middleName}
                                    onFocus={() =>
                                        formik.setFieldTouched("middleName", true, true)
                                    }
                                    touch={formik.touched.middleName}
                                    error={formik.errors.middleName}
                                    type='middleName' placeholder="Enter MiddleName" />
                            </div>
                            <div className=' w-full ' >
                                <p className=' font-medium text-sm mb-2 ' >Last Name</p>
                                <InputComponent InputComponent
                                    name="lastName"
                                    value={formik?.values?.lastName}
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("lastName", true, true)
                                    }
                                    touch={formik.touched.lastName}
                                    error={formik.errors.lastName}
                                    type='lastName' placeholder="Enter LastName" />
                            </div>
                        </div>
                        <div className=' w-full flex flex-col items-center gap-4  ' >
                            <div className=' w-full ' >
                                <p className=' font-medium text-sm mb-2 ' >Email</p>
                                <InputComponent InputComponent
                                    name="email"
                                    value={formik?.values?.email}
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("email", true, true)
                                    }
                                    touch={formik.touched.email}
                                    error={formik.errors.email}
                                    type='email' placeholder="Enter email address" />
                            </div>
                            <div className=' w-full ' >
                                <p className=' font-medium text-sm mb-2 ' >Gender</p> 
                                <Select 
                                value={formik?.values?.gender}
                                onChange={formik.handleChange}
                                name='gender'
                                onFocus={() =>
                                    formik.setFieldTouched("gender", true, true)
                                } 
                                placeholder='Select Gender' w={"full"} textColor="#000" fontSize="14px" fontWeight="400" bgColor="#FCFCFC" borderColor="#BDBDBD" _hover={{ borderColor: "#BDBDBD" }} _focus={{ backgroundColor: "#FCFCFC" }} focusBorderColor="#BDBDBD" height={"45px"} >
                                    <option value={"MALE"} >Male</option>
                                    <option value={"FEMALE"} >Female</option>
                                </Select>
                            </div>
                        </div>
                        <div className=' w-full flex lg:flex-row flex-col items-center gap-4  ' >
                            <div className=' w-full ' >
                                <p className=' font-medium text-sm mb-2 ' >Phone (WhatsApp) </p>
                                <InputComponent InputComponent
                                    name="phone"
                                    value={formik?.values?.phone}
                                    onChange={formik.handleChange}
                                    onFocus={() =>
                                        formik.setFieldTouched("phone", true, true)
                                    }
                                    touch={formik.touched.phone}
                                    error={formik.errors.phone}
                                    type='phone' placeholder="Enter Phone" />
                            </div> 
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
                        <CustomButton type="button" isLoading={createAdminMutation?.isLoading} disable={createAdminMutation?.isLoading} onClick={()=> formik?.handleSubmit()} text={"Create Admin"} secondary={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}

"use client"
import InputComponent from '@/components/shared/inputcomponent';
import LoadingAnimation from '@/components/shared/loading_animation';
import actionService from '@/connections/getdataaction';
import { UserData } from '@/models';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useQuery } from 'react-query';
import * as yup from 'yup'

export default function Configuration() {

    const loginSchema = yup.object({
        email: yup.string().email('This email is not valid').required('Your email is required'),
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        middleName: yup.string().required('Required'),
        gender: yup.string().required('Required'),
        phone: yup.number().required('Required')
    })

    // formik
    const formik = useFormik({
        initialValues: { firstName: '', lastName: '', middleName: '', email: '', gender: '', phone: 0 },
        validationSchema: loginSchema,
        onSubmit: () => { },
    });

    let userid = localStorage.getItem("id")?.toString()

    // const [data, setData] = useState({} as Array<any>)

    const { isLoading } = useQuery(['audiplaylist'], () => actionService.getservicedata(`/admin/${userid}`),
        {
            onError: (error: any) => {
                console.error(error);
            },
            onSuccess: (data: any) => {
                
                formik?.setFieldValue("firstName", data?.data?.data?.firstName)
                formik?.setFieldValue("lastName", data?.data?.data?.lastName)
                formik?.setFieldValue("middleName", data?.data?.data?.middleName)
                formik?.setFieldValue("email", data?.data?.data?.email)
                formik?.setFieldValue("gender", data?.data?.data?.gender)
                formik?.setFieldValue("phone", data?.data?.data?.phone)
 
            }
        }
    )

    return (
        <div className=' pr-6 pb-5 w-full  ' >
            <div className=' px-6 pb-6 pt-2 w-full bg-white shadow-sm rounded-lg text-black ' >
                <div className=' w-full h-[50px] flex items-center border-b border-[#DFE3E8] ' >
                    <p className=' leading-[30px] text-[20px] font-bold ' >My Account</p>
                </div>
                <LoadingAnimation loading={isLoading} > 
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
                            <div className=' w-full flex lg:flex-row flex-col items-center gap-4  ' >
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
                            <div className=' w-full flex lg:flex-row flex-col items-center gap-4  ' >
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
                                    <InputComponent InputComponent
                                        name="gender"
                                        value={formik?.values?.gender}
                                        onChange={formik.handleChange}
                                        onFocus={() =>
                                            formik.setFieldTouched("gender", true, true)
                                        }
                                        touch={formik.touched.gender}
                                        error={formik.errors.gender}
                                        type='gender' placeholder="Enter Gender" />
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
                                <div className=' w-full ' >
                                    <p className=' font-medium text-sm mb-2 ' >Phone 2</p>
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
                        </div>
                    </div>
                </LoadingAnimation>
            </div>
        </div>
    )
}

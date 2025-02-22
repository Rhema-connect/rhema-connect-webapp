"use client"
import { ChatIcon, DownArrowIcon, MenuIcon } from '@/components/svg'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import LanguageSelector from '@/components/LanguageSelector';

interface Props {
    pathname: string
}

function Navbar(props: Props) {
    const {
        pathname
    } = props

    const router = useRouter()

    const [selected, setSelected] = useState("")
    // const [show, setShow] = useState(false)

    const languages = [
        { label: 'English', value: '/auto/en' },
        { label: 'Arabic', value: '/en/ar' },
        { label: 'Farsi', value: '/en/fa' },
        { label: 'Turkish', value: '/en/tr' },
        { label: 'Spanish', value: '/en/es' },
        { label: 'French', value: '/en/fr' },
        { label: 'Portuguese', value: '/en/pt' },
        { label: 'Italian', value: '/en/it' }
    ];
    const langChange = (evt: any) => {
        console.log(evt);

        if (hasCookie('googtrans')) {
            setCookie('googtrans', decodeURI(evt))
            setSelected(evt)
            // setShow(true)
        }
        else {
            setCookie('googtrans', evt)
            setSelected(evt)
        }
        window.location.reload()
    }

    useEffect(() => {
        if (hasCookie('googtrans')) {
            setSelected(getCookie('googtrans') + "")
        } else {
            setSelected('/auto/en')
        }
    }, [])

    return (
        <div className={` max-w-[1360px] w-full relative flex lg:px-6 px-6 ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "lg:h-[96px] h-[86px] text-black " : " h-full "} ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "items-center  justify-between " : ""} lg:${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? " " : "flex-col"} ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "flex-row-reverse" : "flex-col"}  `} >
            {(!pathname?.includes("/auth") && pathname?.includes("home")) ? (
                <label className=' w-full flex justify-end ' >
                    <div role='button' className={` w-fit relative flex  items-center ${!(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? " lg:h-[80px] lg:mt-0 mt-6" : "h-fit text-sm "} gap-2 `} >
                        <ChatIcon />
                        <div className="group school" defaultValue="default">
                            <LanguageSelector />
                        </div>
                    </div>
                </label>
            ) : (
                <div />
            )}
            <div onClick={() => router.push("/home")} role='button' className={`  z-40 flex items-center justify-between ${!(pathname?.includes("dashboard") || pathname?.includes("auth")) ? " h-[64px] lg:h-[80px] w-full  pt-4 " : "h-fit "} `} >
                {!(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ?
                    <img src='/images/logo.svg' alt='logo' /> :
                    <img src='/images/logoblack.svg' className=' ml-auto ' alt='logoblack' />
                }
            </div>
        </div>
    )
}

export default Navbar

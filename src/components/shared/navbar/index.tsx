"use client"
import { ChatIcon, DownArrowIcon, MenuIcon } from '@/components/svg'
import React, { useEffect, useState, useRef } from 'react'
import '../../../../src/app/globals.css'
import { useRouter } from 'next/navigation'
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import LanguageSelector from '@/components/LanguageSelector';
import Cookies from 'js-cookie';

//import GTransLateWidget from  "../../gTranslator/GTranslateWidget";
import GTransLateWidget from "../../gTranslator/GTranslateWidget";

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

        if (!hasCookie('googtrans')) {
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

    // useEffect(() => {
    //     const langChange = () => {
    //       if (!Cookies.get('googtrans')) {
    //         Cookies.set('googtrans', '/en/en');
    //         window.location.reload();
    //       }
         
    //     };
    
    //     langChange();
    //   }, []);

//   useEffect(() => {
//     // Initialize Google Translate
//     const script = document.createElement("script");
//     script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
//     // script.src = "https://cdn.gtranslate.net/widgets/latest/fd.js";
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);

//     // Define translation settings
//     (window as any).gtranslateSettings = {
//       default_language: "en",
//       detect_browser_language: true,
//       languages: ["en", "fr", "es", "ar", "tr", "sw", "iw", "pt", "ru"],
//       wrapper_selector: ".gtranslate_wrapper",
//       //   flag_size: 24,
//       //   horizontal_position: "right",
//       //   vertical_position: "top",
//       //   alt_flags: { en: "usa" },
//       //   select_language_label: "Select Language",
//     };

//     return () => {
//       // Remove the script when the component unmounts
//       document.body.removeChild(script);
//     };
//   }, []);

    // useEffect(() => {
    //     if (hasCookie('googtrans')) {
    //         setSelected(getCookie('googtrans') + "")
    //     } else {
    //         setSelected('/auto/en')
    //     }
    // }, [])

    //   const scriptLoaded = useRef(false);
    
    //   useEffect(() => {
    //     if (scriptLoaded.current) return;
    
    //     const script = document.createElement("script");
    //     script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
    //     script.async = true;
    //     script.defer = true;
    //     document.body.appendChild(script);
    
    //     (window as any).gtranslateSettings = {
    //       default_language: "en",
    //       detect_browser_language: true,
    //       languages: ["en", "fr", "es", "ar", "tr", "sw", "iw", "pt", "ru"],
    //       wrapper_selector: ".gtranslate_wrapper",
    //     };
    
    //     scriptLoaded.current = true;
    
    //     return () => {
    //       document.body.removeChild(script);
    //       scriptLoaded.current = false;
    //     };
    //   }, []);

    return (
        <div className={` max-w-[1360px] w-full relative flex lg:px-6 px-6 ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "lg:h-[96px] h-[86px] text-black " : " h-full "} ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "items-center  justify-between " : ""} lg:${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? " " : "flex-col"} ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "flex-row-reverse" : "flex-col"}  `} >
            {(!pathname?.includes("/auth") && pathname?.includes("home")) ? (
                <label className=' w-full flex justify-end ' >
                    <div role='button' className={` w-fit relative flex  items-center ${!(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? " lg:h-[80px] lg:mt-0 mt-6" : "h-fit text-sm "} gap-2 `} >
                        <ChatIcon />
                        <div>
                        <GTransLateWidget  />
                            {/* <LanguageSelector /> */}
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

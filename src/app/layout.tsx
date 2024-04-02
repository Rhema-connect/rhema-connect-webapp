"use client"
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './Provider'
import Navbar from '@/components/shared/navbar'
import { usePathname, useRouter } from 'next/navigation'
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect } from 'react'
import CustomText from '@/components/shared/textcomponent'
// import { useEffect } from 'react' 

const inter = Inter({ subsets: ['latin'], variable: "--font-inter" })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0); // Scrolls the window to the top
    };

    // Subscribe to router changes and scroll to top on each route change
    handleRouteChange()

    // Unsubscribe from events when component is unmounted
    return () => {
      handleRouteChange()
    };
  }, [pathname, router]);

  let token = (window as any).localStorage.getItem("token")?.toString() 


  useEffect(() => {
    if (!pathname?.includes("/dashboard") && !pathname?.includes("/auth")) {
      (window as any).localStorage.setItem("token", "");
      (window as any).localStorage.setItem("id", ""); 
    } else {
      if (!token || token === "" || token === undefined || token === null) {
        router.push("/auth") 
      }
 
    }

  }, [pathname])

  return (
    <html lang="en">
      <body className={` ${inter.variable} ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? " bg-[#FFF]  " : " !bg-[#3B3B3B] "} !overflow-hidden "`}>
        <Provider>
          <div className={` w-screen h-screen ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? " " : " !bg-[#3B3B3B] "} overflow-x-hidden overflow-y-hidden top-0 bottom-0 !z-[1000000000]  `} >
            {(!pathname?.includes("/auth") && !pathname?.includes("/dashboard") && !pathname?.includes("/resources-info/video/")) && (
              <div className=' fixed inset-0 w-full h-full z-10 bg-black bg-opacity-15 ' >
                <img src='/images/bg.jpeg' alt='bg' className='  object-cover w-full h-full  ' />
              </div>
            )}
            {(!pathname?.includes("/auth") && !pathname?.includes("/dashboard") && !pathname?.includes("/resources-info/video/")) && (
              <div className=' inset-0 fixed bg-[#12121280] z-20 ' />
            )}
            <div className={`  ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "" : "  "} w-full flex flex-col items-center text-white h-screen overflow-x-hidden relative overflow-y-auto z-30 `} >

              <div className={` ${(pathname?.includes("/auth")) ? "border-b border-[#F4F4F4] bg-[#F4F4F4]" : " pb-3 "} lg:px-8 w-screen lg:h-fit ${pathname?.includes("/dashboard") ? "hidden" : "block"} `}>
                <Navbar pathname={pathname} />
              </div>
              <div className={` ${pathname?.includes("/dashboard") ? "" : "max-w-[1145px] lg:px-8"} w-full h-auto `}>
                {/* <div className=' w-full h-full  ' > */}
                <div className={` ${!(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "px-0 " : ""}  w-full   `} >
                  {children}
                </div>
                {/* </div> */}
              </div>

              {(!pathname?.includes("/auth") && !pathname?.includes("/dashboard")) && (
                <div className=' w-full h-fit mt-auto ' >
                  <div className=' w-full flex justify-center items-center h-[50px] bg-[#3B3B3B] ' >
                    <div className=' max-w-[1145px] lg:px-8 px-6 w-full ' >
                      <CustomText className='text-[16px] text-[#BEBEBE] text-sm ' >© RHEMA MENA 2023. All right reserved</CustomText>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  )
}

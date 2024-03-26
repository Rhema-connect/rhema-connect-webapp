"use client"
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './Provider'
import Navbar from '@/components/shared/navbar'
import { usePathname } from 'next/navigation'
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

  return (
    <html lang="en">
      <body className={` ${inter.variable} ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "  " : " !bg-[#3B3B3B] "} !overflow-hidden "`}>
        <Provider>
          <div className=' w-screen h-screen fixed overflow-x-hidden overflow-y-hidden top-0 bottom-0 !z-[1000000000] !bg-[#3B3B3B] ' >
            <img src='/images/bg.png' alt='bg' className=' fixed inset-0 object-cover w-full h-full z-10 ' />
            <div className={`  ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "" : "  "} w-full flex flex-col items-center text-white h-screen overflow-x-hidden relative overflow-y-auto z-20 `} >

              <div className={` ${(pathname?.includes("/auth")) ? "border-b border-[#F4F4F4] bg-[#F4F4F4]" : " pb-3 "} lg:px-8 w-screen lg:h-fit ${pathname?.includes("/dashboard") ? "hidden" : "block"} `}>
                <Navbar pathname={pathname} />
              </div>
              <div className={` ${pathname?.includes("/dashboard") ? "" : "max-w-[1145px] lg:px-8"} w-full h-auto `}>
                {/* <div className=' w-full h-full  ' > */}
                <div className={` ${!(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "px-0 " : ""}  w-full h-full   `} >
                  {children}
                </div>
                {/* </div> */}
              </div>
              <div className=' w-full h-fit mt-auto ' > 
                <div className=' w-full flex justify-center items-center h-[50px] bg-[#3B3B3B] ' >
                  <div className=' max-w-[1145px] lg:px-8 px-6 w-full ' >
                    <CustomText className='text-[16px] text-[#BEBEBE] text-sm ' >© RHEMA MENA 2023. All right reserved</CustomText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  )
}

"use client"
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './Provider'
import Navbar from '@/components/shared/navbar'
import { usePathname } from 'next/navigation'
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect } from 'react'
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
      <body className={` ${inter.variable} ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "  " : " !bg-[#3B3B3B] "}  "`}>
        <Provider>
          <div className={`  ${(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "" : " !bg-[#3B3B3B] "} w-full flex flex-col items-center justify-center relative text-white overflow-x-hidden inter `} >
            <div className={` ${(pathname?.includes("/auth")) ? "border-b border-[#F4F4F4] bg-[#F4F4F4]" : " bg-[#3B3B3B] pb-3 !z-[1000000000] "} lg:px-8 w-screen z-[1000] fixed top-0 ${pathname?.includes("/dashboard") ? "hidden" : "block"} `}>
              <Navbar pathname={pathname} />
            </div>
            {!pathname?.includes("/dashboard") &&
              <div className=' h-[100px]  ' />
            }
            <div className={` ${pathname?.includes("/dashboard") ? "" : "max-w-[1274px] lg:px-8"}  w-full h-fit `}>

              <div className=' w-full h-full ' >
                <div className={` lg:static lg:px-0 ${!(pathname?.includes("/dashboard") || pathname?.includes("/auth")) ? "px-6 " : ""}  relative w-full `} >
                  {!(pathname?.includes("/dashboard") || pathname?.includes("/auth")) && (
                    <div className=' w-[80%] lg:w-[625px] h-[146px] lg:h-[392px] bg-[#828282] lg:rounded-tr-none rounded-tr-2xl rounded-br-2xl opacity-20 absolute top-0 left-0 ' />
                  )}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  )
}

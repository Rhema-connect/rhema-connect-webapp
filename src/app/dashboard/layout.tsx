"use client"
import Menubar from "@/components/dashboardcomponent/menubar"
import Sidebar from "@/components/dashboardcomponent/sidebar"
import { Box, Flex } from "@chakra-ui/react"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className=" w-full flex h-[100vh] overflow-hidden " >
            <div className=" w-fit h-[100vh] bg-[#3B3B3B] " >
                <Sidebar />
            </div>
            <div className=" w-full h-[100vh]  overflow-y-auto " >
                <div className="  w-full sticky z-30 top-0 " > 
                    <div className=" w-full h-[96px] bg-[#3B3B3B] border-b border-[#828282] " />
                    <Menubar />
                </div>
                <div className=" w-full h-full flex flex-1 p-6 " >
                    {children}
                    <div className=" h-12 " />
                </div>
            </div>
        </div>
    )
}
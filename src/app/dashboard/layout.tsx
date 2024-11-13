"use client"
import ConfigMenu from "@/components/dashboardcomponent/configmenu"
import Menubar from "@/components/dashboardcomponent/menubar"
import Sidebar from "@/components/dashboardcomponent/sidebar"
import { Box, Flex } from "@chakra-ui/react"
import { usePathname } from "next/navigation"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const pathname = usePathname();

    return (
        <div className=" w-full flex h-[100vh] overflow-hidden " >
            <div className=" w-fit h-[100vh] bg-[#3B3B3B] " >
                <Sidebar />
            </div>
            <div className={` w-full h-[100vh] overflow-y-auto  `} >
                {!pathname?.includes("resources-info") &&
                    <div className="  w-full sticky z-30 top-0 " >
                        <div className=" w-full h-[96px] bg-[#3B3B3B] border-b border-[#828282] " />
                        {((pathname !== "/dashboard") && !pathname?.includes("admin")) && (
                            <Menubar />
                        )}
                    </div>
                }
                <div className={` w-full h-full flex flex-1 ${!pathname?.includes("resources-info") ? "bg-white" : "bg-white"}   ${pathname?.includes("configuration") ? " pl-6 pt-6 " : " p-6 "} gap-6 `} >
                    {pathname?.includes("configuration") && (
                        <div className=" w-fit flex sticky left-0 h-[60%] " >
                            <ConfigMenu />
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </div>
    )
}
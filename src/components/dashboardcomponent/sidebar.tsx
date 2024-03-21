import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { DashboardIcon, FileIcon, HelpIcon, ResourceIcon, SettingsIcon, SideIcon } from '../svg'
import { usePathname, useRouter } from 'next/navigation';

interface Props { }

function Sidebar(props: Props) {
    const { } = props

    const pathname = usePathname();
    const rounter = useRouter();

    const topmenu = [
        {
            name: "Dashboard",
            path: "/dashboard/resources"
        },
        // {
        //     name: "Resources",
        //     path: "/dashboard/resources"
        // },
        // {
        //     name: "Statistics",
        //     path: "/dashboard/statistics"
        // },
    ]

    const bottommenu = [
        {
            name: "Help Desk",
            path: "/dashboard/help"
        },
        {
            name: "Configurations",
            path: "/dashboard/configuration"
        },
    ]

    const [active, setActive] = useState(pathname)

    useEffect(() => {
        setActive(pathname)
    }, [])

    const clickHandler = (item: string) => {
        rounter.push(item)
        setActive(item)
    }

    return (
        <div className=' w-[300px] h-[100vh] flex flex-col p-6 border-r border-r-[#828282] ' >
            <div className=' w-full flex items-center justify-between ' >
                <img src='/images/logo.svg' alt='logo' />
                <SideIcon />
            </div>
            <div className=' w-full pt-6 flex flex-col gap-4 ' >
                {topmenu?.map((item: { name: string, path: string }, index: number) => {
                    return (
                        <div key={index} role='button' onClick={() => clickHandler(item?.path)} className={` w-full h-[56px] ${item?.name === "Dashboard" ? "bg-[#BE0027] text-white" : ""} ${(item?.name !== "Dashboard" && item?.path.includes(active)) ? " bg-[#F4F4F4] text-[#212B36] " : " text-white "} px-3 flex  items-center gap-3 rounded-[8px] `} >
                            {item?.name === "Dashboard" && (
                                <DashboardIcon color='white' />
                            )}
                            {item?.name === "Resources" && (
                                <ResourceIcon color={item?.path.includes(active) ? "#212B36" : 'white'} />
                            )}
                            {item?.name === "Statistics" && (
                                <FileIcon color='white' />
                            )}
                            <p className=' font-medium text-sm leading-[22px] ' >{item?.name}</p>
                        </div>
                    )
                })}
            </div>
            <div className=' w-full pt-6 mt-auto flex flex-col gap-4 ' >
                {bottommenu?.map((item: { name: string, path: string }, index: number) => {
                    return (
                        <div key={index} role='button' onClick={() => clickHandler(item?.path)} className={` w-full h-[56px] ${item?.name === "Dashboard" ? "bg-[#BE0027] text-white" : ""} ${(item?.name !== "Dashboard" && item?.path.includes(active)) ? " bg-[#F4F4F4] text-[#212B36] " : " text-white "} px-3 flex  items-center gap-3 rounded-[8px] `} >
                            {item?.name === "Help Desk" && (
                                <HelpIcon color='white' />
                            )}
                            {item?.name === "Configurations" && (
                                <SettingsIcon color={item?.path.includes(active) ? "#212B36" : 'white'} />
                            )}
                            {item?.name === "Statistics" && (
                                <FileIcon color='white' />
                            )}
                            <p className=' font-medium text-sm leading-[22px] ' >{item?.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar

import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

interface Props { }

function Menubar(props: Props) {
    const { } = props

    const pathname = usePathname();
    const router = useRouter();

    const clickHandler =(item: string)=> {
        router.push(item)
    }

    return (
        <div className=' w-full h-[150px] flex flex-col bg-[#3B3B3B] px-4 ' >
            <div className=' w-full mt-auto ' >
                <div>
                    <p className=' text-[20px] font-bold leading-[20px] '>Manage Resources</p>
                    <p className=' leading-[22px] text-[12px] mt-1' >Create, edit and resources</p>
                </div>
                <div className=' mt-5 flex ' >
                    <div role='button' onClick={()=> clickHandler("/dashboard/resources")} className={` w-[95px] ${pathname === "/dashboard/resources"  ? "bg-white text-[#3B3B3B] font-semibold " : " text-sm font-medium "} flex justify-center items-center leading-[22px] text-[14px] rounded-t-[8px] h-[48px] `} >
                        Videos
                    </div>
                    <div role='button' onClick={()=> clickHandler("/dashboard/resources/audios")} className={` w-[127px] ${pathname === "/dashboard/resources/audios"  ? "bg-white text-[#3B3B3B] font-semibold " : " text-sm font-medium "} flex justify-center items-center leading-[22px] text-[14px] rounded-t-[8px] h-[48px] `} >
                        Audios
                    </div>
                    <div role='button' onClick={()=> clickHandler("/dashboard/resources/books")} className={` w-[117px] ${pathname === "/dashboard/resources/books"  ? "bg-white text-[#3B3B3B] font-semibold " : " text-sm font-medium "} flex justify-center items-center leading-[22px] text-[14px] rounded-t-[8px] h-[48px] `} >
                        Pdfs/Books
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menubar

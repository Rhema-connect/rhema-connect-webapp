import React from 'react'
import { AccountIcon, LockIcon, LogoutIcon } from '../svg'
import { usePathname, useRouter } from 'next/navigation';

export default function ConfigMenu() {
 
    const pathname = usePathname();
    const router = useRouter();

    const clickHandler = (item: string) => {
        router.push(item)
    }

    const logOut = () => {
        localStorage.clear()
        router.push("/auth")
    }
    
    return (
        <div className=" h-full w-[300px] pt-12 px-6 rounded-lg bg-white" >
            <div role='button' onClick={()=> clickHandler("/dashboard/configuration")} className={` ${pathname === "/dashboard/configuration" ? " bg-[#F4F6F8] " : "" }  px-3 flex h-[56px] rounded-lg w-full items-center gap-4 `} >
                <AccountIcon />
                <p className=' leading-6 text-[#212B36] text-base ' >Account</p>
            </div>
            <div role='button' onClick={()=> clickHandler("/dashboard/configuration/password")} className={` ${pathname === "/dashboard/configuration/account" ? " bg-[#F4F6F8] " : "" } px-3 flex h-[56px] rounded-lg w-full items-center gap-4 `} >
                <LockIcon />
                <p className=' leading-6 text-[#212B36] text-base ' >Password</p>
            </div>
            <div role='button' onClick={logOut} className={` px-3 flex h-[56px] rounded-lg w-full items-center gap-4 `} >
                <LogoutIcon />
                <p className=' leading-6 text-[#BE0027] text-base ' >Log out</p>
            </div>
        </div>
    )
}

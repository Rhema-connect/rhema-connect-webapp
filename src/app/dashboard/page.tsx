import { BackIcon } from '@/components/svg'
import React from 'react'

interface Props { }

function Dashboard(props: Props) {
    const { } = props

    return (
        <div className=' w-full flex justify-center text-[#212B36] pt-24 ' >
            <div className=' max-w-[460px] bg-slate-400 w-full ' >
                <div className=' flex gap-2 items-center '  >
                    <BackIcon />
                    <p className=' leading-6 ' >Go back</p>
                </div>
                <p className=' text-[24px] leading-9 mt-4 ' >Sign in</p>
                <p className=' text-sm text-[#637381] ' >Sign into your account </p>
            </div> 
            
        </div> 
    )
}

export default Dashboard

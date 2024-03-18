import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {}

function Dashboard(props: Props) {
    const {} = props

    return (
        <div className=' w-full h-full ' >
            <div className=' w-full flex bg-white px-2 flex-col ' >
                <p className=' font-bold text-[24px] leading-[36px] text-black ' >Resource</p>
            </div>
        </div>
    )
}

export default Dashboard

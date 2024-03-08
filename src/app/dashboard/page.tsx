import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {}

function Dashboard(props: Props) {
    const {} = props

    return (
        <div className=' w-full h-full ' >
            <div className=' w-full flex ' >
                <p className=' font-bold text-[24px] leading-[36px] text-black ' >Playlist</p>
            </div>
        </div>
    )
}

export default Dashboard

import CustomText from '@/components/shared/textcomponent'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    active: string,
    setActive: any
}

function SideBar(props: Props) {
    const {
        active,
        setActive
    } = props

    const router = useRouter()

    const route = [
        {
            name: 'Video',
            route: '/resources'
        },
        {
            name: 'Audio',
            route: '/resources/audio'
        },
        {
            name: 'Books',
            route: '/resources/book'
        },
    ] 

    const clickHandler = (item: string) => {
        setActive(item)
        router.push(item)
    }

    return (
        <div className=' w-fit relative ' >
            <div className=' w-[140px] hidden lg:flex flex-col gap-1 ' >
                    {route?.map((item: { name: string, route: string }, index) => {
                        return (
                            <div role='button' onClick={() => clickHandler(item?.route)} key={index} className={` text-white border-[#BE0027] ${item?.route === active ? 'border-l-2' : ''} h-9 flex items-center px-4 leading-6 `} >
                                <CustomText>
                                    {item?.name}
                                </CustomText>
                            </div>
                        )
                    })}
                </div>
        </div>
    )
}

export default SideBar

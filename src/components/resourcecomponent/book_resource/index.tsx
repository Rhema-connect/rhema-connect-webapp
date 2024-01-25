import CustomText from '@/components/shared/textcomponent'
import React from 'react'

interface Props {}

function BookResource(props: Props) {
    const {} = props

    const data = [
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
        {
            name: 'Pastor Matt',
            title: 'This Symnolism of ‘Saltburn That you probably missed',
            read: '8 min read'
        },
    ]

    return (
        <div className=' w-full ' >
            <div className=' w-full grid grid-cols-3 gap-6 gap-y-12  ' >
                {data?.map((item: { title: string, name: string, read: string }, index: number) => {
                    return (
                        <div key={index} className=' w-full  ' >
                            <div className=' flex items-center gap-2 ' >
                                <div className=' w-6 h-6 rounded-full bg-slate-600 ' />
                                <CustomText className=' leading-6 ' >{item?.name}</CustomText>
                            </div>
                            <CustomText className=' leading-[28px] font-medium text-[18px] mt-2 '  >
                                {item?.title}
                            </CustomText>
                            <CustomText className=' leading-[18px] text-xs ' >
                                {item?.read}
                            </CustomText>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BookResource

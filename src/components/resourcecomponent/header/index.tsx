import SearchBar from '@/components/shared/searchbar'
import React from 'react'

interface Props {
    path: string
}

function ResourceHeader(props: Props) {
    const {
        path
    } = props

    return (
        <>
            {path === '/home/resources' && (
                <div className=' my-6 w-full  hidden lg:flex justify-end relative items-center ' >
                    <div className=' w-[204px] absolute -left-16 lg:flex hidden h-14 rounded-lg bg-[#BE0027] justify-center items-center ' >
                        <p className=' text-[20px] leading-[30px] text-white font-bold ' >Video</p>
                    </div>
                    <SearchBar />
                </div>
            )}
            {path === '/home/resources/book' && (
                <div className=' my-6 w-full  hidden lg:flex justify-end relative items-center ' >
                    <div className=' w-[204px] absolute -left-16 lg:flex hidden h-14 rounded-lg bg-[#BE0027] justify-center items-center ' >
                        <p className=' text-[20px] leading-[30px] text-white font-bold ' >Book</p>
                    </div>
                    <SearchBar />
                </div>
            )}
            {path === '/home/resources/audio' && (
                <div className=' my-6 w-full  hidden lg:flex gap-6 justify-end relative items-center ' >
                    <div className=' w-[204px] absolute -left-16 lg:flex hidden h-14 rounded-lg bg-[#BE0027] justify-center items-center ' >
                        <p className=' text-[20px] leading-[30px] text-white font-bold ' >Audio</p>
                    </div>
                    <SearchBar />
                    <select className=' h-14 w-[200px] rounded-lg bg-[#3B3B3B] border border-[#919EAB52] px-4 pl-12 text-white ' >
                        <option>All Resources</option>
                    </select>
                </div>
            )}
        </>
    )
}

export default ResourceHeader

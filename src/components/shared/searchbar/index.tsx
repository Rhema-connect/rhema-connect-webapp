import { SearchIcon } from '@/components/svg'
import React from 'react'

interface Props { }

function SearchBar(props: Props) {
    const { } = props

    return (
        <div className=' w-fit h-14 relative ' > 
            <input className=' h-14 w-[427px] outline-none rounded-lg bg-[#3B3B3B] border border-[#919EAB52] px-4 pl-12 text-white ' placeholder='Search Authors, title, events...' />
            <div className=' h-14 px-3 flex justify-center  absolute top-0 items-center ' >
                <SearchIcon />
            </div>
        </div>
    )
}

export default SearchBar

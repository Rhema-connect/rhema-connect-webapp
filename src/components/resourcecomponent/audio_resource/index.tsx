"use client"
import React, { useEffect, useState } from 'react'
import CustomText from '../../shared/textcomponent'
import { useRouter } from 'next/navigation'
import { IPlaylistData } from '@/models'
import actionService from '@/connections/getdataaction'
import { useQuery } from 'react-query'
import Audiolist from './audio_list'
import LoadingAnimation from '@/components/shared/loading_animation'
import { IoMdMore } from 'react-icons/io'
import DeleteContent from '../delete_content'
import ModalLayout from '@/components/shared/modal_layout'
import PlaylistForm from '../create_playlist/playlist_form'
import InfiniteScrollerComponent from '@/connections/infiniteScrollerComponent'
import useSearchStore from '@/store/useSearchData'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'

interface Props {
    admin?: boolean;
}

function AudioResource(props: Props) {
    const {
        admin,
    } = props

    const router = useRouter()

    // const [results, setData] = useState([] as Array<IPlaylistData>)
    const [open, setOpen] = useState(false)
    const [currentdata, setCurrentData] = useState({} as IPlaylistData)

    const { search, setSearchValue } = useSearchStore((state) => state);

    const [show, setShow] = useState("")

    useEffect(() => {
        setSearchValue("")
    }, []) 

    const refScroll: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        refScroll.current.scrollLeft += scrolloffset
    };


    const { results, isLoading, ref, isRefetching, refetch } = InfiniteScrollerComponent({ url: `/content/playlists/all?type=AUDIO${search ? `&keyword=${search}` : ""}`, limit: 4, type: "AUDIO", name: "audiplaylist" })


    const clickHandler = (item: IPlaylistData) => {
        if (admin) {
            router?.push("/dashboard/resources-info/audio/" + item?.id)
        } else {
            router?.push("/home/resources-info/audio/" + item?.id)
        }
    }

    const openModal = (e: any, item: string) => {
        e.stopPropagation() 
        setShow(item)
    }

    const editHandler = (e: any, item: IPlaylistData) => {
        e.stopPropagation() 
        setCurrentData(item)
        setOpen(true)
        setShow("")

    }

    return (
        <div className=' w-full flex-col relative flex items-center ' >
            <div className=' w-full flex relative h-fit items-center ' >
                
                {results?.length >= 4 && (
                    <>
                        <button onClick={() => scroll(-400)} role='button' className=' w-12 z-10 h-12 border bg-white text-black rounded-full cursor-pointer absolute my-auto -left-4 flex justify-center items-center ' >
                            <IoArrowBack />
                        </button>
                        <button onClick={() => scroll(400)} role='button' className=' w-12 z-10 h-12 border bg-white text-black rounded-full cursor-pointer absolute my-auto -right-4 flex justify-center items-center ' >
                            <IoArrowForward />
                        </button>
                    </>
                )}
                <div ref={refScroll} className=' w-full flex relative overflow-x-auto gap-4 items-center scroll-smooth no-scrollbar ' >
                    <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >

                        <div className=' w-fit flex gap-4  ' >
                            {results?.map((item: IPlaylistData, index: number) => {
                                if (index === results?.length - 1) {
                                    return (
                                        <div ref={ref} onClick={() => clickHandler(item)} role='button' key={index} className=' lg:max-w-full max-w-[400px] w-full md:w-[300px] relative ' >
                                            <div className=' w-full h-[204px] bg-red-900 rounded-2xl ' >
                                                <img alt='thumbnail' src={item?.thumbnail} className="w-full h-[204px] object-cover rounded-2xl " />
                                            </div>
                                            <div className=' w-full flex items-center justify-between ' >
                                                <div>
                                                    <CustomText className=' leading-[22px] font-medium text-[16px] md:text-[18px] mt-4 '  >
                                                        {item?.title}
                                                    </CustomText>
                                                    <CustomText className=' leading-[18px] text-xs ' >
                                                        Playlist ・{item?.items?.length} audio
                                                    </CustomText>
                                                </div>
                                                <div className=' mt-1 ' >
                                                    <button onClick={(e) => openModal(e, item?.id + "")} className=' p-2 ' >
                                                        <IoMdMore size={"20px"} />
                                                    </button>
                                                    {show === item?.id + "" && (
                                                        <div className=' bottom-[10px] !z-40 right-0 bg-white w-32 gap-2 px-4 rounded-lg py-3 shadow-lg absolute flex flex-col ' >
                                                            <button onClick={(e) => editHandler(e, item)} role='button' className=' w-full text-left h-5 ' >
                                                                Edit Audio
                                                            </button>
                                                            <DeleteContent refetch={()=> refetch()} text={true} id={item?.id} type="Playlist" />
                                                        </div>
                                                    )}
                                                    {show === item?.id + "" && (
                                                        <div onClick={(e) => openModal(e, "")} className=' fixed inset-0 z-30 ' />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div onClick={() => clickHandler(item)} role='button' key={index} className=' lg:max-w-full max-w-[400px] w-full md:w-[300px] relative ' >
                                            <div className=' w-full h-[204px] bg-red-900 rounded-2xl ' >
                                                <img alt='thumbnail' src={item?.thumbnail} className="w-full h-full object-cover rounded-2xl " />
                                            </div>
                                            <div className=' w-full flex items-center justify-between ' >
                                                <div>
                                                    <CustomText className=' leading-[22px] font-medium text-[16px] md:text-[18px] mt-4 '  >
                                                        {item?.title}
                                                    </CustomText>
                                                    <CustomText className=' leading-[18px] text-xs ' >
                                                        Playlist ・{item?.items?.length} audio
                                                    </CustomText>
                                                </div>
                                                <div className=' mt-1 ' >
                                                    <button onClick={(e) => openModal(e, item?.id + "")} className=' p-2 ' >
                                                        <IoMdMore size={"20px"} />
                                                    </button>
                                                    {show === item?.id + "" && (
                                                        <div className=' bottom-[10px] !z-40 right-0 bg-white w-32 gap-2 px-4 rounded-lg py-3 shadow-lg absolute flex flex-col ' >
                                                            <button onClick={(e) => editHandler(e, item)} role='button' className=' w-full text-left h-5 ' >
                                                                Edit Audio
                                                            </button>
                                                            <DeleteContent  refetch={()=> refetch()} text={true} id={item?.id} type="Playlist" />
                                                        </div>
                                                    )}
                                                    {show === item?.id + "" && (
                                                        <div onClick={(e) => openModal(e, "")} className=' fixed inset-0 z-10 ' />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </LoadingAnimation>
                </div>
            </div>
            <Audiolist admin={admin} />
            <ModalLayout open={open} close={() => setOpen(false)} size={"lg"} title={"Edit Platlist"} >
                <PlaylistForm typeinfo={"AUDIO"} setOpen={setOpen} edit={true} data={currentdata} />
            </ModalLayout>
        </div>
    )
}

export default AudioResource

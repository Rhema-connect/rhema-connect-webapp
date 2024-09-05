"use client"
import React, { useState } from 'react'
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

interface Props {
    admin?: boolean
}

function AudioResource(props: Props) {
    const {
        admin
    } = props

    const router = useRouter()

    const [data, setData] = useState([] as Array<IPlaylistData>)
    const [open, setOpen] = useState(false)
    const [currentdata, setCurrentData] = useState({} as IPlaylistData)

    const [show, setShow] = useState("")

    const { isLoading } = useQuery(['audiplaylist'], () => actionService.getservicedata(`/content/playlists/all`,
        {
            limit: 16,
            page: 0,
            type: "AUDIO"
        }),
        {
            onError: (error: any) => {
                console.error(error);
            },
            onSuccess: (data: any) => {
                console.log(data?.data?.data);
                setData(data?.data?.data)
            }
        }
    )

    const clickHandler = (item: IPlaylistData) => {
        if (admin) {
            router?.push("/resources-info/audio/" + item?.id)
        } else {
            router?.push("/home/resources-info/audio/" + item?.id)
        }
    }

    const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string) => {
        e.stopPropagation()

        setShow(item)
    }

    const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: IPlaylistData) => {
        e.stopPropagation()
        
        setCurrentData(item)
        setOpen(true)
        setShow("")
    }

    return (
        <div className=' w-full flex-col flex items-center ' >
            <LoadingAnimation loading={isLoading} length={data?.length} >
                <div className=' w-fit md:w-fit lg:w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10  ' >
                    {data?.map((item: IPlaylistData, index: number) => {
                        return (
                            <div onClick={() => clickHandler(item)} role='button' key={index} className=' lg:max-w-full max-w-[400px] w-full md:w-[300px] ' >
                                <div className=' w-full h-[204px] bg-red-900 rounded-2xl ' >
                                    <img alt='thumbnail' src={item?.thumbnail} className="w-full h-full object-cover rounded-2xl " />
                                </div>
                                <div className=' w-full flex items-center justify-between ' >
                                    <div>
                                        <CustomText className=' leading-[22px] font-medium text-[14px] mt-4 '  >
                                            {item?.title}
                                        </CustomText>
                                        <CustomText className=' leading-[18px] text-xs ' >
                                            Playlist ・{item?.items?.length} videos
                                        </CustomText>
                                    </div>
                                    <div className=' relative mt-1 ' >
                                        <button onClick={(e) => openModal(e, item?.id + "")} className=' p-2 ' >
                                            <IoMdMore size={"20px"} />
                                        </button>
                                        {show === item?.id + "" && (
                                            <div className=' top-[30px] z-20 right-0 bg-white w-32 gap-2 px-4 rounded-lg py-3 shadow-lg absolute flex flex-col ' >
                                                <button onClick={(e) => editHandler(e, item)} role='button' className=' w-full text-left h-5 ' >
                                                    Edit playlist
                                                </button>
                                                <DeleteContent text={true} id={item?.id} type="Playlist" />
                                            </div>
                                        )}
                                        {show === item?.id + "" && (
                                            <div onClick={() => setShow("")} className=' fixed inset-0 z-10 ' />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </LoadingAnimation>
            <Audiolist admin={admin} />
            <ModalLayout open={open} close={()=> setOpen(false)} size={"lg"} title={"Edit Platlist"} >
                <PlaylistForm typeinfo={"AUDIO"} setOpen={setOpen} edit={true} data={currentdata} />
            </ModalLayout>
        </div>
    )
}

export default AudioResource

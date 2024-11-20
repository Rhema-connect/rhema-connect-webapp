import LoadingAnimation from '@/components/shared/loading_animation';
import ModalLayout from '@/components/shared/modal_layout';
import { VideoIcon } from '@/components/svg'
import actionService from '@/connections/getdataaction';
import { IPlaylistData } from '@/models';
import { Image } from '@chakra-ui/react';
import React, { useState } from 'react'
import { IoMdMore } from "react-icons/io";
import { useQuery } from 'react-query';
import PlaylistForm from '../create_playlist/playlist_form';
import DeleteContent from '../delete_content';
import InfiniteScrollerComponent from '@/connections/infiniteScrollerComponent';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { textLimit } from '@/util/textlimit';

interface Props { }

function VideoPlatlist(props: Props) {
    const { } = props

    const [data, setData] = useState([] as Array<IPlaylistData>)
    const [currentdata, setCurrentData] = useState({} as IPlaylistData)

    const [show, setShow] = useState("")
    const [open, setOpen] = useState(false)

    const refScroll: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        refScroll.current.scrollLeft += scrolloffset
    };

    // const { isLoading } = useQuery(['videoplaylist'], () => actionService.getservicedata(`/content/playlists/all`,
    //     {
    //         limit: 10,
    //         page: 0,
    //         type: "VIDEO"
    //     }),
    //     {
    //         onError: (error: any) => {
    //             console.error(error);
    //         },
    //         onSuccess: (data: any) => { 
    //             setData(data?.data?.data)
    //         }
    //     }
    // )


    const { results, isLoading, ref, isRefetching, refetch } = InfiniteScrollerComponent({ url: `/content/playlists/all?type=VIDEO`, limit: 10, filter: "id", type: "VIDEO", name: "videoplaylist" })

    const editHandler = (item: IPlaylistData) => {
        setCurrentData(item)
        setOpen(true)
        setShow("")
    }
 
    return (
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
            <div ref={refScroll} className=' w-full px-4 flex overflow-x-auto gap-4 items-center scroll-smooth no-scrollbar ' >
                <LoadingAnimation loading={isLoading} refeching={isRefetching} >
                    <div className=' w-fit py-4  flex gap-6 ' >
                        {results?.map((item: IPlaylistData, index: number) => {
                            if (index === results?.length - 1) {
                                return (
                                    <div ref={ref} key={index} className=' w-[300px] relative flex gap-3 items-center justify-between px-4 py-2 rounded-lg ' >
                                        <div className=' flex items-center gap-3 ' >
                                            <div className=' w-fit ' >
                                                <div className=' w-[56px] h-[56px] bg-slate-600 rounded-xl ' >
                                                    <Image width={"full"} height={"full"} rounded={"12px"} alt='playlist' objectFit={"cover"} src={item?.thumbnail} />
                                                </div>
                                            </div>
                                            <div className=' mr-6 ' >
                                                <p className=' font-medium text-[14px] leading-[22px] ' >{textLimit(item?.title, 30)}</p>
                                                <p className=' text-[#637381] text-[12px] leading-[18px] mt-1 ' >Playlist ・{item?.items?.length} videos</p>
                                            </div>
                                        </div>
                                        <div className=' flex gap-2 items-center ' >
                                            <VideoIcon />
                                            <div className=' mt-1 ' >
                                                <button onClick={() => setShow(item?.id + "")} className='  ' >
                                                    <IoMdMore size={"20px"} />
                                                </button>
                                                {show === item?.id + "" && (
                                                    <div className=' top-[0px] z-20 right-0 bg-white w-32 gap-2 px-4 rounded-lg py-3 shadow-lg absolute flex flex-col ' >
                                                        <div onClick={() => editHandler(item)} role='button' className=' w-full  h-5 ' >
                                                            Edit playlist
                                                        </div>
                                                        <DeleteContent refetch={refetch} text={true} id={item?.id} type="Playlist" />
                                                    </div>
                                                )}
                                                {show === item?.id + "" && (
                                                    <div onClick={() => setShow("")} className=' fixed inset-0 z-10 ' />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className='w-[300px] relative flex gap-3 items-center justify-between px-4 py-2 rounded-lg ' >
                                        <div className=' flex items-center gap-3 ' >
                                            <div className=' w-fit ' >

                                                <div className=' w-[56px] h-[56px] bg-slate-600 rounded-xl ' >
                                                    <Image width={"full"} height={"full"} rounded={"12px"} alt='playlist' objectFit={"cover"} src={item?.thumbnail} />
                                                </div>
                                            </div>
                                            <div className=' mr-6 ' >
                                                <p className=' font-medium text-[14px] leading-[22px] ' >{textLimit(item?.title, 30)}</p>
                                                <p className=' text-[#637381] text-[12px] leading-[18px] mt-1 ' >Playlist ・{item?.items?.length} videos</p>
                                            </div>
                                        </div>
                                        <div className=' flex gap-2 items-center ' >
                                            <VideoIcon />
                                            <div className='  mt-1 ' >
                                                <button onClick={() => setShow(item?.id + "")} className='  ' >
                                                    <IoMdMore size={"20px"} />
                                                </button>
                                                {show === item?.id + "" && (
                                                    <div className=' top-0 z-20 right-0 bg-white w-32 gap-2 px-4 rounded-lg py-3 shadow-lg absolute flex flex-col ' >
                                                        <div onClick={() => editHandler(item)} role='button' className=' w-full  h-5 ' >
                                                            Edit playlist
                                                        </div>
                                                        <DeleteContent refetch={refetch} text={true} id={item?.id} type="Playlist" />
                                                    </div>
                                                )}
                                                {show === item?.id + "" && (
                                                    <div onClick={() => setShow("")} className=' fixed inset-0 z-10 ' />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <ModalLayout open={open} close={() => setOpen(false)} size={"lg"} title={"Edit Platlist"} >
                        <PlaylistForm typeinfo={"VIDEO"} setOpen={setOpen} edit={true} data={currentdata} />
                    </ModalLayout>
                </LoadingAnimation>
            </div>
        </div>
    )
}

export default VideoPlatlist

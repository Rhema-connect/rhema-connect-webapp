"use client"
import React, { useEffect, useState } from 'react'
import CustomText from '../../shared/textcomponent'
import { useRouter } from 'next/navigation'
import actionService from '@/connections/getdataaction'
import { useQuery } from 'react-query'
import { ContentData } from '@/models'
import LoadingAnimation from '@/components/shared/loading_animation'
import DeleteContent from '../delete_content'
import { textLimit } from '@/util/textlimit'
import { IoMdMore } from 'react-icons/io'
import Videoform from '../create_video/videoform'
import InfiniteScrollerComponent from '@/connections/infiniteScrollerComponent'
import useSearchStore from '@/store/useSearchData'
import VideoPlayer from '@/components/shared/videoPlayer'

interface Props {
    admin?: boolean 
}

function VideoResource(props: Props) {
    const {
        admin, 
    } = props

    const [show, setShow] = useState("")
    const [open, setOpen] = useState(false)
    const { search, setSearchValue } = useSearchStore((state) => state);

    const [currentdata, setCurrentData] = useState({} as ContentData)

    const { results, isLoading, ref, isRefetching, refetch } = InfiniteScrollerComponent({ url: `/content?type=VIDEO${search ? `&keyword=${search}` : ""}`, limit: 20, filter: "id", type: "VIDEO", search: search, name: "videolist" })

    const router = useRouter()

    const clickHandler = (item: string | number) => {
        if (admin) {
            router.push("/dashboard/resources-info/video/" + item)
        } else {
            router.push("/home/resources-info/video/" + item)
        }
    }

    const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ContentData) => {
        e.stopPropagation()

        setCurrentData(item)
        setOpen(true)
        setShow("")
    }

    useEffect(()=> {
        setSearchValue("")
    }, [])

    const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string) => {
        e.stopPropagation()

        setShow(item)
    }

    return (
        <LoadingAnimation loading={isLoading} length={results?.length} >
            <div className=' w-full flex justify-center ' >
                <div className=' w-full md:w-fit lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10 ' >
                    {results?.map((item: ContentData, index: number) => { 
                        if (index === results?.length - 1) {
                            return (
                                <div ref={ref} role='button' onClick={() => clickHandler(item?.id ? item?.id : "")} key={index} className=' lg:max-w-full w-full md:w-[300px] ' >
                                    <div className=' w-full  lg:w-full lg:h-[180px] h-[200px] bg-red-900 rounded-2xl ' >
                                        {/* <img src={item?.thumbnail} alt='video' className=' w-full h-full rounded-2xl ' /> */}
                                        <VideoPlayer src={item?.youtube_url + ""} measureType={'px'} rounded='16px' />
                                    </div>
                                    <div className=' w-full flex justify-between  mt-4 ' >
                                        <div>
                                            <CustomText className=' leading-[30px] font-bold text-[20px]'  >
                                                {item?.title}
                                            </CustomText>
                                            {item?.description && (
                                                <CustomText className=' text-[14px] leading-6 ' >
                                                    {textLimit(item?.description, 30)}
                                                </CustomText>
                                            )}
                                        </div>
                                        {admin && (
                                            <div className=' relative mt-1 ' >
                                                <button onClick={(e) => openModal(e, item?.id + "")} className='  ' >
                                                    <IoMdMore size={"24px"} />
                                                </button>
                                                {show === item?.id + "" && (
                                                    <div className=' top-[30px] z-20 right-0 bg-white w-32 gap-2 px-4 rounded-lg py-3 shadow-lg absolute flex flex-col ' >
                                                        <button onClick={(e) => editHandler(e, item)} role='button' className=' w-full text-left h-5 ' >
                                                            Edit Video
                                                        </button>
                                                        <DeleteContent refetch={()=> refetch()} text={true} id={item?.id} type="Content" />
                                                    </div>
                                                )}
                                                {show === item?.id + "" && (
                                                    <div onClick={() => setShow("")} className=' fixed inset-0 z-10 ' />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div role='button' onClick={() => clickHandler(item?.id ? item?.id : "")} key={index} className=' lg:max-w-full max-w-[400px] w-full md:w-[300px] ' >
                                    <div className=' w-full  lg:w-full lg:h-[180px] h-[200px] bg-red-900 rounded-2xl ' >
                                        {/* <img src={item?.thumbnail} alt='video' className=' w-full h-full rounded-2xl ' /> */}
                                        <VideoPlayer src={item?.youtube_url + ""}  rounded='16px' measureType={'px'}/>
                                    </div>
                                    <div className=' w-full flex justify-between  mt-4 ' >
                                        <div>
                                            <CustomText className=' leading-[30px] font-bold text-[20px]'  >
                                                {item?.title}
                                            </CustomText>
                                            {item?.description && (
                                                <CustomText className=' text-[14px] leading-6 ' >
                                                    {textLimit(item?.description, 30)}
                                                </CustomText>
                                            )}
                                        </div>
                                        {admin && (
                                            <div className=' relative mt-1 ' >
                                                <button onClick={(e) => openModal(e, item?.id + "")} className='  ' >
                                                    <IoMdMore size={"24px"} />
                                                </button>
                                                {show === item?.id + "" && (
                                                    <div className=' top-[30px] z-20 right-0 bg-white w-32 gap-2 px-4 rounded-lg py-3 shadow-lg absolute flex flex-col ' >
                                                        <button onClick={(e) => editHandler(e, item)} role='button' className=' w-full text-left h-5 ' >
                                                            Edit Video
                                                        </button>
                                                        <DeleteContent refetch={()=> refetch()} text={true} id={item?.id} type="Content" />
                                                    </div>
                                                )}
                                                {show === item?.id + "" && (
                                                    <div onClick={() => setShow("")} className=' fixed inset-0 z-10 ' />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <Videoform data={currentdata} open={open} setOpen={setOpen} edit={true} />
            </div>
        </LoadingAnimation>
    )
}

export default VideoResource

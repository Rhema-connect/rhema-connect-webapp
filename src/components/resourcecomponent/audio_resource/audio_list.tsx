import AudioPlayer from "@/components/shared/musicplayer";
import CustomText from "@/components/shared/textcomponent";
import { RoundedArrow } from "@/components/svg";
import actionService from "@/connections/getdataaction";
import { ContentData } from "@/models";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import DeleteContent from "../delete_content";
import LoadingAnimation from "@/components/shared/loading_animation";
import ModalLayout from "@/components/shared/modal_layout";
import PlaylistForm from "../create_playlist/playlist_form";
import { IoMdMore } from "react-icons/io";
import Audioform from "../create_audio/audioform";
import InfiniteScrollerComponent from "@/connections/infiniteScrollerComponent";

interface Props {
  admin?: boolean;
}

function Audiolist(props: Props) {
  const { admin } = props;

  const [data, setData] = useState([] as Array<ContentData>);
  const [currentData, setCurrentData] = useState({} as ContentData);
  const [currentdata, setCurrentdata] = useState({} as ContentData);
  const [show, setShow] = useState("");
  const [open, setOpen] = useState(false);

  // const { isLoading } = useQuery(['audilist'], () => actionService.getservicedata(`/content`,
  //     {
  //         limit: 16,
  //         page: 0,
  //         type: "AUDIO"
  //     }),
  //     {
  //         onError: (error: any) => {
  //             console.error(error);
  //         },
  //         onSuccess: (data: any) => {
  //             console.log(data?.data?.data);

  //             if (data?.data?.data.length > 0) {
  //                 setData(data?.data?.data)
  //             }
  //         }
  //     }
  // )

  const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({
    url: `/content?type=AUDIO`,
    limit: 10,
    filter: "id",
    type: "VIDEO",
    name: "audilist",
  });

  const editHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ContentData
  ) => {
    e.stopPropagation();

    setCurrentdata(item);
    setOpen(true);
    setShow("");
  };

  const openModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: string
  ) => {
    e.stopPropagation();

    setShow(item);
  };

  return (
    <div className=" w-full mt-14 pb-20 ">
      <div className=" w-full flex justify-between items-center ">
        <CustomText className=" text-[20px] leading-[30px] font-bold ">
          Audio Messages
        </CustomText>
        {/* <div className=' w-fit flex items-center gap-8 ' >
                    <div className=' flex gap-2 ' >
                        <button className=' rounded-2xl border text-black border-white bg-transparent px-3 h-8 ' >More </button>
                        <div role='button' >
                            <RoundedArrow />
                        </div>
                        <div role='button' className=' rotate-180 ' >
                            <RoundedArrow />
                        </div>
                    </div>
                </div> */}
      </div>
      <LoadingAnimation loading={isLoading} length={results?.length}>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mt-8 ">
          {results?.map((item: ContentData, index: number) => {
            if (index === results?.length - 1) {
              return (
                <div
                  role="button"
                  ref={ref}
                  onClick={() => setCurrentData(item)}
                  key={index}
                  className={` ${
                    item?.title === currentData?.title
                      ? " bg-[#BE0027] text-white "
                      : ""
                  } w-full flex items-center shadow-lg py-2 px-4 rounded-xl gap-[18px] `}
                >
                  <div className=" w-14 h-14 bg-red-900 rounded-2xl ">
                    <img
                      alt="thumbnail"
                      src={item?.thumbnail}
                      className="w-full h-full object-cover rounded-2xl "
                    />
                  </div>
                  <div>
                    <CustomText className=" leading-[22px] font-medium text-[14px] ">
                      {item?.title}
                    </CustomText>
                    <CustomText className=" leading-[18px] text-xs ">
                      {item?.description}
                    </CustomText>
                  </div>
                  {admin && (
                    <div className=" relative mt-1 ml-auto ">
                      <button
                        onClick={(e) => openModal(e, item?.id + "")}
                        className=" p-2 "
                      >
                        <IoMdMore size={"20px"} />
                      </button>
                      {show === item?.id + "" && (
                        <div className=" top-[30px] z-20 right-0 bg-white w-32 gap-2 px-4 rounded-lg py-3 shadow-lg absolute flex flex-col ">
                          <button
                            onClick={(e) => editHandler(e, item)}
                            role="button"
                            className=" w-full text-left h-5 text-black "
                          >
                            Edit playlist
                          </button>
                          <DeleteContent
                            text={true}
                            id={item?.id}
                            type="Playlist"
                          />
                        </div>
                      )}
                      {show === item?.id + "" && (
                        <button
                          onClick={(e) => openModal(e, "")}
                          className=" fixed inset-0 z-10 "
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  role="button"
                  onClick={() => setCurrentData(item)}
                  key={index}
                  className={` ${
                    item?.title === currentData?.title
                      ? " bg-[#BE0027] text-white "
                      : ""
                  } w-full flex items-center shadow-lg py-2 px-4 rounded-xl gap-[18px] `}
                >
                  <div className=" w-14 h-14 bg-red-900 rounded-2xl ">
                    <img
                      alt="thumbnailyyyyyy"
                      src={item?.thumbnail}
                      className="w-full h-full object-cover rounded-2xl "
                    />
                  </div>
                  <div>
                    <CustomText className=" leading-[22px] font-medium text-[14px] ">
                      {item?.title}
                    </CustomText>
                    <CustomText className=" leading-[18px] text-xs ">
                      {item?.description}
                    </CustomText>
                  </div>
                  {admin && (
                    <div className=" relative mt-1 ml-auto ">
                      <button
                        onClick={(e) => openModal(e, item?.id + "")}
                        className=" p-2 "
                      >
                        <IoMdMore size={"20px"} />
                      </button>
                      {show === item?.id + "" && (
                        <div className=" top-[30px] z-20 right-0 bg-white w-32 gap-2 px-4 rounded-lg py-3 shadow-lg absolute flex flex-col ">
                          <button
                            onClick={(e) => editHandler(e, item)}
                            role="button"
                            className=" w-full text-left h-5 text-black "
                          >
                            Edit playlist
                          </button>
                          <DeleteContent
                            text={true}
                            id={item?.id}
                            type="Playlist"
                          />
                        </div>
                      )}
                      {show === item?.id + "" && (
                        <button
                          onClick={(e) => openModal(e, "")}
                          className=" fixed inset-0 z-10 "
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </LoadingAnimation>
      {currentData?.url && <AudioPlayer data={currentData} />}

      <Audioform data={currentdata} open={open} setOpen={setOpen} edit={true} />
    </div>
  );
}

export default Audiolist;

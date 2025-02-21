"use client";
import LoadingAnimation from "@/components/shared/loading_animation";
import CustomText from "@/components/shared/textcomponent";
import { ContentData } from "@/models";
import React, { useEffect, useState } from "react";
import DeleteContent from "../delete_content";
import { formatTimeAgo } from "@/util/dateformat";
import { useRouter } from "next/navigation";
import { IoMdMore } from "react-icons/io";
import Bookform from "../create_book/bookform";
import InfiniteScrollerComponent from "@/connections/infiniteScrollerComponent";

interface Props {
  admin?: boolean;
}

function BookResource(props: Props) {
  const { admin } = props;

  const [data, setData] = useState([] as Array<ContentData>);
  const [show, setShow] = useState("");
  const [open, setOpen] = useState(false);

  const [currentdata, setCurrentData] = useState({} as ContentData);
  // const { search, setSearchValue } = useSearchStore((state) => state);

  const router = useRouter();

  // const { isLoading, isRefetching } = useQuery(['bookslist'], () => actionService.getservicedata(`/content/books/all`,
  //     {
  //         limit: 10,
  //         page: 1,
  //     }),
  //     {
  //         onError: (error: any) => {
  //             console.error(error);
  //         },
  //         onSuccess: (data: any) => {
  //             if (data?.data?.data.length > 0) {
  //                 setData(data?.data?.data)
  //             }
  //         }
  //     }
  // )

  const { results, isLoading, ref, isRefetching, refetch } = InfiniteScrollerComponent({
    url: "/content/books/all",
    limit: 10,
    filter: "id",
    type: "BOOK",
    name: "audiplaylist",
  });

  const clickHandler = (item: ContentData) => {
    let slug: string = item?.title?.toString().split(" ").join("-") + "";

    localStorage?.setItem("bookurl", item?.url + "");
    if (admin) {
      router.push("/resources-info/book/" + item?.id);
    } else {
      router.push("/home/resources-info/book/" + item?.id);
    }
  };

  const editHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ContentData
  ) => {
    e.stopPropagation();

    setCurrentData(item);
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

  // useEffect(()=> {
  //     setSearchValue("")
  // }, [])

  return (
    <div className=" w-full ">
      <LoadingAnimation
        loading={isLoading}
        refeching={isRefetching}
        length={results?.length}
      >
        <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-12  ">
          {results?.map((item: ContentData, index: number) => {
            if (results?.length === index + 1) {
              return (
                // <a key={index} href={item?.url} target="_blank" >
                <div
                  role="button"
                  key={index}
                  ref={ref}
                  onClick={() => clickHandler(item)}
                  className=" w-full rounded-2xl items-center flex p-3 shadow-xl  "
                >
                  <div className=" w-full ">
                    <div className=" flex items-center gap-2 ">
                      <div className=" w-fit " >
                        <div className=" w-12 h-12 rounded-full bg-slate-600 ">
                          <img
                            alt="thumbnail"
                            src={item?.thumbnail}
                            className="w-full h-full object-cover rounded-2xl "
                          />
                        </div>
                      </div>
                      <CustomText className=" leading-6 text-sm ">
                        {item?.author_name}
                      </CustomText>
                    </div>
                    <CustomText className=" leading-[23px] font-medium mt-2 ">
                      {item?.title}
                    </CustomText>
                    <CustomText className=" leading-[18px] text-xs ">
                      {formatTimeAgo(new Date(item?.created_at ?? "").getTime())}
                    </CustomText>
                  </div>
                  {admin && (
                    <div className=" relative mt-1 ">
                      <button
                        onClick={(e) => openModal(e, item?.id + "")}
                        className="  "
                      >
                        <IoMdMore size={"24px"} />
                      </button>
                      {show === item?.id + "" && (
                        <div className=" top-[30px] z-40 right-0 bg-white w-32 gap-2 px-4 rounded-lg py-3 shadow-lg absolute flex flex-col ">
                          <button
                            onClick={(e) => editHandler(e, item)}
                            role="button"
                            className=" w-full text-left h-5 "
                          >
                            Edit Pdf
                          </button>
                          <DeleteContent
                            text={true}
                            id={item?.id}
                            type="Content"
                            refetch={refetch}
                          />
                        </div>
                      )}
                      {show === item?.id + "" && (
                        <div
                          onClick={() => setShow("")}
                          className=" fixed inset-0 z-10 "
                        />
                      )}
                    </div>
                  )}
                </div>
                // </a>
              );
            } else {
              return (
                // <a key={index} href={item?.url} target="_blank" >
                <div
                  role="button"
                  key={index}
                  onClick={() => clickHandler(item)}
                  className=" w-full rounded-2xl items-center flex p-3 shadow-xl  "
                >
                  <div className=" w-full ">
                    <div className=" flex items-center gap-2 ">
                      <div className=" w-fit " >
                        <div className=" w-12 h-12 rounded-full bg-slate-600 ">
                          <img
                            alt="thumbnail"
                            src={item?.thumbnail}
                            className="w-full h-full object-cover rounded-2xl "
                          />
                        </div>
                      </div>
                      <CustomText className=" leading-6 text-sm ">
                        {item?.author_name}
                      </CustomText>
                    </div>
                    <CustomText className=" leading-[23px] font-medium mt-2 ">
                      {item?.title}
                    </CustomText>
                    <CustomText className=" leading-[18px] text-xs ">
                      {formatTimeAgo(new Date(item?.created_at ?? "").getTime())}
                    </CustomText>
                  </div>
                  {admin && (
                    <div className=" relative mt-1 ">
                      <button
                        onClick={(e) => openModal(e, item?.id + "")}
                        className="  "
                      >
                        <IoMdMore size={"24px"} />
                      </button>
                      {show === item?.id + "" && (
                        <div className=" top-[30px] z-40 right-0 bg-white w-32 gap-2 px-4 rounded-lg py-3 shadow-lg absolute flex flex-col ">
                          <button
                            onClick={(e) => editHandler(e, item)}
                            role="button"
                            className=" w-full text-left h-5 "
                          >
                            Edit Video
                          </button>
                          <DeleteContent
                            text={true}
                            id={item?.id}
                            type="Content"
                            refetch={refetch}
                          />
                        </div>
                      )}
                      {show === item?.id + "" && (
                        <div
                          onClick={() => setShow("")}
                          className=" fixed inset-0 z-10 "
                        />
                      )}
                    </div>
                  )}
                </div>
                // </a>
              );
            }
          })}
          <Bookform
            data={currentdata}
            open={open}
            setOpen={setOpen}
            edit={true}
          />
        </div>
      </LoadingAnimation>
    </div>
  );
}

export default BookResource;

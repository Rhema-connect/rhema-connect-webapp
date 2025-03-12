"use client"

import CustomText from "@/components/shared/textcomponent"
import VideoPlayer from "@/components/shared/videoPlayer"
import actionService from "@/connections/getdataaction"
import type { ContentData } from "@/models"
import { textLimit } from "@/util/textlimit"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { useQuery } from "react-query"

interface Props {
    id?: any;
  dashboard?: boolean;

}

const Othervideo=(props: Props)=> {
  const { id, dashboard } = props

  const [data, setData] = useState([] as Array<ContentData>)

  const router = useRouter()

  const { isLoading } = useQuery(
    ["videolist"],
    () =>
      actionService.getservicedata(`/content`, {
        limit: 20,
        page: 0,
        type: "VIDEO",
      }),
    {
      onError: (error: any) => {
        console.error(error)
      },
      onSuccess: (data: any) => {
        setData(data?.data?.data)
      },
    },
  )

  const clickHandler = (e: React.MouseEvent, item: string | number) => {
    e.preventDefault()
    e.stopPropagation()
    if (dashboard) {
      router.push("/dashboard/resources-info/video/" + item)
    } else {
      router.push("/home/resources-info/video/" + item)
    }
  }

  return (
    <div className="w-full py-4 max-h-[70vh] lg:max-h-[420px]  flex flex-col gap-4 overflow-y-auto">
      {data?.map((item: ContentData, index: number) => {
        return (
          <div
            key={index}
            className={`w-full ${(item?.id == id) ? "border-2 border-[#E84545]" : ""} rounded-[14px]  rounded-[14px] flex items-center gap-3 p-2 cursor-pointer`}
            onClick={(e) => clickHandler(e, item?.id ?? "")}
          >
            <div className="w-[160px] h-[100px] rounded-lg bg-slate-950 relative">
              {/* Using a wrapper div to prevent VideoPlayer from capturing clicks */}
              <div className="absolute inset-0 z-10" onClick={(e) => clickHandler(e, item?.id ?? "")}></div>
              <VideoPlayer
                src={item?.youtube_url + ""}
                rounded="16px"
                width={160}
                height={100}
                measureType="px"
                showCustomControl={false}
                reactPlayerControl={false}
              />
            </div>
            <div>
              <CustomText className="leading-[22px] font-medium text-[16px] md:text-[20px] text-white">{textLimit(item?.title + "", 15)}</CustomText>
              <CustomText className="leading-[18px] text-[#BEBEBE] text-xs">
                {textLimit(item?.description + "ubjdgud kfndjfbhd nfdjnfdbf fhfudbufb dfnkgnd", 40)}
              </CustomText>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Othervideo;
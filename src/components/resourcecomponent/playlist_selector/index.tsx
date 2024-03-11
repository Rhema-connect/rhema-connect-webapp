import LoadingAnimation from '@/components/shared/loading_animation';
import actionService from '@/connections/getdataaction';
import { IPlaylistData } from '@/models';
import { Select } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery } from 'react-query';

interface Props {
    type: "VIDEO" | "AUDIO",
    [x: string]: any;
}

function PlaylistSelector(props: Props) {
    const {
        type,
        ...rest
    } = props

    const [data, setData] = useState([] as Array<IPlaylistData>)

    const { isLoading, isRefetching } = useQuery(['videoplaylist'], () => actionService.getservicedata(`/content/playlists`,
        {
            limit: 10,
            page: 0,
            type: type
        }),
        {
            onError: (error: any) => {
                console.log(error);

            },
            onSuccess: (data: any) => {
                console.log(data?.data?.data);
                setData(data?.data?.data)
            }
        }
    )

    return (
        <LoadingAnimation loading={isLoading} length={data?.length} > 
            <Select {...rest} placeholder='Select playlist' width={"full"} textColor="#000" fontSize="14px" fontWeight="400" bgColor="#FCFCFC" borderColor="#BDBDBD" _hover={{ borderColor: "#BDBDBD" }} _focus={{ backgroundColor: "#FCFCFC" }} focusBorderColor="#BDBDBD" height={"45px"} >
                {data?.map((item: IPlaylistData, index: number) => {
                    return (
                        <option key={index} >{item?.title}</option>
                    )
                }
                )}
            </Select>
        </LoadingAnimation>
    )
}

export default PlaylistSelector

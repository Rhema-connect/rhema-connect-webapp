import React from 'react'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios';
// import { toast } from 'react-toastify';
import lodash from 'lodash';
import axios from "../util/httpclient"

interface Props {
  url: string,
  filter?: string,
  limit: number, 
  name?: string,
  search?: string,
  type?: string
}

function InfiniteScrollerComponent(props: Props) {
  const {
    url,
    filter,
    limit, 
    name,
    search,
    type
  } = props

  const [size, setSize] = React.useState(limit)
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [results, setResults] = React.useState([] as any)
  const intObserver = React.useRef<IntersectionObserver>();

  const { data, isLoading, refetch, isRefetching, isError } = useQuery(name ? [name, url, search] : [url], () => axios.get(`${url}`, {
    params: {
      limit: size,
      page: 0, 
    }
  }), {
    onError: (error: AxiosError<any, any>) => {
      // toast.error(error.response?.data);
    },

    onSuccess: (data: any) => {  
      
      if (isRefetching) {
        if (size === limit) {
          setResults(lodash.uniqBy(data?.data?.data, filter ? filter : "id"));
          // return
        } else if (size !== limit) {
          results.push(...data?.data?.data);
          setResults(lodash.uniqBy(results, filter ? filter : "id"));
        }
      } else {
        setResults(lodash.uniqBy(data?.data?.data, filter ? filter : "id"));
      } 

      if(size > data?.data?.total) {
        setHasNextPage(false)
      } else {
        setHasNextPage(true)
      }
      // setHasNextPage(!(data?.data?.data?.length > data?.data?.total));  
      
      window.scrollTo(0, window.innerHeight);
      //   setData(data.data.content);
    }
  })



  const ref = React.useCallback((post: any) => {
    if (isLoading && isRefetching) return;
    if (intObserver.current) intObserver.current.disconnect();
    intObserver.current = new IntersectionObserver((posts) => {
      if (posts[0].isIntersecting && hasNextPage && !isRefetching) {
        setSize(prev => prev + limit);
        refetch()
      }
    });
    if (post) intObserver.current.observe(post);
  }, [isLoading, hasNextPage, setSize, isRefetching, refetch, limit]);

  return {
    data,
    isLoading,
    refetch,
    results,
    ref,
    isRefetching,
    isError
  }
}

export default InfiniteScrollerComponent

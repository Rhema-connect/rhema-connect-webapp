// import { ICreateUser } from "../models";
import axios from "../util/httpclient"

export function usePlaylistCallback() {
  const handlePlaylist = async (postData: any): Promise<any> => {
    try {
      const response = await axios.post('/content/create-playlist', postData,
        {
          headers: { 'Content-Type': 'application/json' },
        });
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { handlePlaylist }
}

export function useUploaderCallback() {
  const handleUploader = async (postData: any, image: any): Promise<any> => {
    try {
      const response = await axios.post('/upload', postData,
        {
          headers: {
            'Content-Type': image.type,
          },
        });
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { handleUploader }
}

export function useCreatePlaylistCallback() {
  const handleCreatePlaylist = async (postData: any): Promise<any> => {
    try {
      const response = await axios.post('/content/create-playlist', postData,
        {
          headers: { 'Content-Type': 'application/json' },
        });
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { handleCreatePlaylist }
}

export function useCreateContentCallback() {
  const handleCreateContent = async (postData: any): Promise<any> => {
    try {
      const response = await axios.post('/content/create', postData,
        {
          headers: { 'Content-Type': 'application/json' },
        });
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { handleCreateContent }
}

export function useGetDataCallback() {
  const handleGetData = async (url: string, params?: any): Promise<any> => {
    try {
      const response = await axios.get(url,
        {
          params: params,
          headers: { 'Content-Type': 'application/json' },
        });
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { handleGetData }
}
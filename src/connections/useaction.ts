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

export function useupdatePlaylistCallback() {
  const handleupdatePlaylist = async (postData: any, index: number | string): Promise<any> => {
    try {
      const response = await axios.put('/content/update-playlist/'+index, postData,
        {
          headers: { 'Content-Type': 'application/json' },
        });
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { handleupdatePlaylist }
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

export function useCreateBookCallback() {
  const handleCreateBook = async (postData: any): Promise<any> => {
    try {
      const response = await axios.post('/content/create-book', postData,
        {
          headers: { 'Content-Type': 'application/json' },
        });
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { handleCreateBook }
}

export function useAddCommentsCallback() {
  const handleAddComments = async (postData: any, index: number): Promise<any> => {
    try {
      const response = await axios.post('/content/comment/'+index, postData,
        {
          headers: { 'Content-Type': 'application/json' },
        });
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { handleAddComments }
} 

export function useDeleteContentCallback() {
  const handleDeleteContent = async (index: number | string): Promise<any> => {
    try {
      const response = await axios.delete('/content/'+index,
        {
          headers: { 'Content-Type': 'application/json' },
        });
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { handleDeleteContent }
} 

export function useDeletePlaylistCallback() {
  const handleDeletePlaylist = async (index: number | string): Promise<any> => {
    try {
      const response = await axios.delete('/content/playlist/'+index,
        {
          headers: { 'Content-Type': 'application/json' },
        });
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { handleDeletePlaylist }
} 
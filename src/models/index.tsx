export interface CreatePlaylistData {
  type: string,
  title: string,
  thumbnail?: string
}

export interface IPlaylistData {
  type: string,
  title: string,
  thumbnail?: string,
  items?: Array<ContentData>,
  id?: string | number
}

export interface ContentData {
  content_type: string,
  url?: string,
  youtube_url?: string,
  title?: string,
  description?: string,
  countries?: [
    string
  ],
  thumbnail?: string,
  isDraft?: boolean,
  author_name?: string,
  author_image?: string,
  id?: number | string,
  created_at?: string
}

export interface CommentData {
  name: string,
  comment: string,
  content_id: number,
  created_at?: string
}
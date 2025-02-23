export interface IPost {
  _id: string
  body: string
  image: string
  user: IUser
  createdAt: string
  comments: IComment[]
  id: string
}

export interface IUser {
  _id: string
  name: string
  photo: string
}

export interface IComment {
  _id: string
  content?: string
  commentCreator: ICommentCreator
  post: string
  createdAt: string
}

export interface ICommentCreator {
  _id: string
  name: string
  photo: string
}

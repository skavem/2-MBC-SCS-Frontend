export interface ISObject {
  id: string | number
  fullName: string
  mark?: string | number
}

export type ReactKeyType = string

export interface ISObjectWRKey extends ISObject {
  reactKey: ReactKeyType
}

export interface IBook extends ISObject {
  id: string
}

export interface IRBook extends ISObjectWRKey {
  id: string
}

export interface IChapter extends ISObject {
  id: number
}

export interface IRChapter extends ISObjectWRKey  {
  id: number
}

export interface IVerse extends ISObject {
  id: number
  mark: number
}

export interface IRVerse extends ISObjectWRKey  {
  id: number
  mark: number
}

export interface ISearchVerse extends ISObject {
  fullName: string
  mark: string
  book_id: string
  chapter_id: number
  id: number
}

export interface IRSearchVerse extends ISObjectWRKey {
  fullName: string
  mark: string
  book_id: string
  chapter_id: number
  id: number
}

export interface ISong extends ISObject {
  id: number
  mark: number
}

export interface IRSong extends ISObjectWRKey  {
  id: number
  mark: number
}

export interface ICouplet extends ISObject {
  id: number
  mark: string
}

export interface IRCouplet extends ISObjectWRKey {
  id: number
  mark: string
}
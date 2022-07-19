export interface IShownCouplet {
  id: number,
  text: string
}

export interface IShownVerse {
  verse: {
    text: string,
    id: number
  },
  reference: {
    book: string,
    chapter: number,
    verse: number
  }
}
import {v4 as uuidv4} from 'uuid'

import { AppDispatch } from "..";
import { IBook, IRBook } from "../../models";
import { WSSingletone } from '../../websocket/wsSingletone';
import { booksSlice } from "../slices/BiblePage/booksSlice";

export const setBooks = (books: IBook[]) => {
  return async (dispatch: AppDispatch) => {
    const rBooks: IRBook[] = books.map(book => ({
      ...book, 
      reactKey: uuidv4()
    }))
    dispatch(booksSlice.actions.setBooks(rBooks))
    dispatch(setActiveBook(rBooks[0]))
  }
}

export const setActiveBook = (book: IRBook) => {
  return async (dispatch: AppDispatch) => {
    dispatch(booksSlice.actions.setActiveBook(book))
    WSSingletone.get().getChapters(book.id as string)
  }
}
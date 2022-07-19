import { v4 } from "uuid";
import { AppDispatch } from "..";
import { IBook, IChapter, IRSearchVerse, IRVerse, ISearchVerse } from "../../models";
import { versesSHSlice } from "../slices/BiblePage/versesSHSlice";

export const setSHVerses = (verses: ISearchVerse[]) => {
  return async (dispatch: AppDispatch) => {
    const rVerses: IRSearchVerse[] = verses.map(verse => ({
      ...verse, reactKey: v4()
    }))
    dispatch(versesSHSlice.actions.setVerses(rVerses))
  }
}

export const setActiveSHVerse = (verse: IRSearchVerse) => {
  return async (dispatch: AppDispatch) => {
    dispatch(versesSHSlice.actions.setActiveVerse(verse))
  }
}

export const addToHistory = (verse: IRVerse, book: IBook, chapter: IChapter) => {
  return async(dispatch: AppDispatch) => {
    dispatch(versesSHSlice.actions.addToHistory({
      ...verse, 
      reactKey: v4(),
      book_id: book.id,
      chapter_id: chapter.id,
      mark: `${book.id} ${chapter.fullName}:${verse.mark}`
    }))
    dispatch(versesSHSlice.actions.flipToHistory())
  }
}

export const flipToHistory = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(versesSHSlice.actions.flipToHistory())
  }
}

export const removeFromHistory = (verse: IRSearchVerse) => {
  return async (dispatch: AppDispatch) => {
    dispatch(versesSHSlice.actions.removeFromHisory(verse))
  }
}
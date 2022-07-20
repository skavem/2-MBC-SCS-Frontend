import { v4 as uuidv4 } from 'uuid'

import { AppDispatch } from "../..";
import { IChapter, IRChapter } from "../../../models";
import { WSSingletone } from '../../../websocket/wsSingletone';
import { chaptersSlice } from '../../slices/BiblePage/chaptersSlice';

const keysMap = new Map()

export const setChapters = (chapters: IChapter[]) => {
  return async (dispatch: AppDispatch) => {
    const rChapters: IRChapter[] = chapters.map(chapter => {
      let key = ''
      if (keysMap.has(chapter.id)) {
        key = keysMap.get(chapter.id)!
      } else {
        key = uuidv4()
        keysMap.set(chapter.id, key)
      }
      return {
        ...chapter,
        reactKey: key
      }
    })
    dispatch(chaptersSlice.actions.setChapters(rChapters))
    dispatch(setActiveChapter(rChapters[0]))
  }
}

export const setActiveChapter = (chapter: IRChapter) => {
  return async (dispatch: AppDispatch) => {
    dispatch(chaptersSlice.actions.setActiveChapter(chapter))
    WSSingletone.get().getVerses(chapter.id as number)
  }
}
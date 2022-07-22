import {v4 as uuidv4} from 'uuid'

import { AppDispatch, store } from "../..";
import { IVerse, IRVerse } from "../../../models";
import { versesSlice } from '../../slices/BiblePage/versesSlice';

const keysMap = new Map()

export const setVerses = (verses: IVerse[]) => {
  return async (dispatch: AppDispatch) => {
    const rVerses: IRVerse[] = verses.map(verse => {
      let key = ''
      if (keysMap.has(verse.id)) {
        key = keysMap.get(verse.id)!
      } else {
        key = uuidv4()
        keysMap.set(verse.id, key)
      }
      return {
        ...verse,
        reactKey: key
      }
    })
    dispatch(versesSlice.actions.setVerses(rVerses))
    dispatch(versesSlice.actions.setActiveVerse(rVerses[0]))
  }
}

export const setActiveVerse = (verse: IRVerse) => {
  return async (dispatch: AppDispatch) => {
    dispatch(versesSlice.actions.setActiveVerse(verse))
  }
}

export const setNextVerseActive = () => {
  return async (dispatch: AppDispatch) => {
    const curVerse = store.getState().verses.active!
    const nextVerse = store.getState().verses.list.find(
      verse => verse.mark === curVerse?.mark + 1
    )
    if (nextVerse) {
      dispatch(versesSlice.actions.setActiveVerse(nextVerse))
    }
  }
}

export const setPrevVerseActive = () => {
  return async (dispatch: AppDispatch) => {
    const curVerse = store.getState().verses.active!
    const nextVerse = store.getState().verses.list.find(
      verse => verse.mark === curVerse?.mark - 1
    )
    if (nextVerse) {
      dispatch(versesSlice.actions.setActiveVerse(nextVerse))
    }
  }
}
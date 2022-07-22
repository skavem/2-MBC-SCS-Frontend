import { useCallback, useMemo } from "react"

import { useAppDispatch, useAppSelector } from "./redux"

import { IRVerse } from "../models"
import { setNextVerseActive, setPrevVerseActive } from "../store/actions/BiblePage/versesActions"
import { WSSingletone } from "../websocket/wsSingletone"
import { IhotKeys, useHotkeys } from "./useHotkeys"

export const useVersesHotkeys = () => {
  const dispatch = useAppDispatch()
  const verse = useAppSelector(state => state.verses.active)

  const showVerse = useCallback(
    () => WSSingletone.get().showVerse(verse as IRVerse),
    [verse]
  )

  const hideVerse = useCallback(
    () => WSSingletone.get().hideVerse(),
    []
  )

  const hotKeys: IhotKeys = useMemo(() => (
    {
      ArrowDown: () => dispatch(setNextVerseActive()),
      ArrowUp: () => dispatch(setPrevVerseActive()),
      Enter: () => showVerse(),
      Escape: () => hideVerse()
    }
  ), [dispatch, showVerse, hideVerse])

  useHotkeys(hotKeys)
}

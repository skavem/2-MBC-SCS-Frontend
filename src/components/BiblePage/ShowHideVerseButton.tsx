import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addToHistory } from '../../store/actions/BiblePage/versesSHActions'
import { WSSingletone } from '../../websocket/wsSingletone'
import ShowHideButton from '../ShowHideButton'

const ShowHideVerseButton = ({ className = '' }: { className?: string }) => {
  const isShown = useAppSelector(state => state.recv.verse) !== null

  const dispatch = useAppDispatch()

  const activeVerse = useAppSelector(state => state.verses.active)
  const activeBook = useAppSelector(state => state.books.active)
  const activeChapter = useAppSelector(state => state.chapters.active)

  const onClick = () => {
    if (isShown) {
      WSSingletone.get().hideVerse()
    } else {
      WSSingletone.get().showVerse(activeVerse!)
      dispatch(addToHistory(activeVerse!, activeBook!, activeChapter!))
    }
  }

  return (
  <div className={'flex items-center justify-center '+className}>
    <ShowHideButton
    isShown={isShown}
    onButtonClick={onClick}
    />
    </div>
  )
}

export default ShowHideVerseButton
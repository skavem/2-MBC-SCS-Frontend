import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import useStoreItems from '../../../hooks/useStoreItems'
import { useVersesHotkeys } from '../../../hooks/useVersesHotkeys'
import { IRVerse, ISObjectWRKey } from '../../../models'
import { store, storeReducersEnum } from '../../../store'
import { setActiveVerse } from '../../../store/actions/BiblePage/versesActions'
import { addToHistory } from '../../../store/actions/BiblePage/versesSHActions'
import { WSSingletone } from '../../../websocket/wsSingletone'
import ItemsList from '../../items-list/ItemsList'

const VersesList = ({ className }: { className: string }) => {
  const verses = useStoreItems(storeReducersEnum.verses)
  const shown = useAppSelector(state => state.recv.verse)

  const dispatch = useAppDispatch()

  useVersesHotkeys()

return (
  <ItemsList
    className={className}
    {...verses}
    isItemShown={item => item.id === shown?.verse.id}
    onItemClick={(verse: ISObjectWRKey) => dispatch(
      setActiveVerse(verse as IRVerse)
    )}
    onDoubleItemClick={
      verse => {
        WSSingletone.get().showVerse(verse as IRVerse)
        const book = store.getState()[storeReducersEnum.books].active!
        const chapter = store.getState()[storeReducersEnum.chapters].active!
        dispatch(addToHistory(verse as IRVerse, book, chapter))
      }
    }
  />
)
}

export default VersesList
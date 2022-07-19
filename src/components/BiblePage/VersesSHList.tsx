import React from 'react'

import { IRSearchVerse } from '../../models'
import useStoreItems from '../../hooks/useStoreItems'
import { store, storeReducersEnum } from '../../store'
import ItemsList from '../ItemsList'
import { useAppDispatch } from '../../hooks/redux'
import { setActiveBook } from '../../store/actions/booksActions'
import { setActiveChapter } from '../../store/actions/chaptersActions'
import { setActiveVerse } from '../../store/actions/versesActions'

const VersesSHList = ({ className = '' }: { className?: string }) => {
  const items = useStoreItems(storeReducersEnum.versesSH)

  const dispatch = useAppDispatch()

  const goToVerse = (verseTo: IRSearchVerse) => {
    const book = store.getState()[storeReducersEnum.books].list.find(
      book => book.id === verseTo.book_id
    )
    dispatch(setActiveBook(book!))

    setTimeout(() => {
      const chapter = store.getState()[storeReducersEnum.chapters].list.find(
        chapter => chapter.id === verseTo.chapter_id
      )
      dispatch(setActiveChapter(chapter!))
    }, 200)


    setTimeout(() => {
      const verse = store.getState()[storeReducersEnum.verses].list.find(
        verse => verse.id === verseTo.id
      )
      dispatch(setActiveVerse(verse!))
    }, 400)
  }

  return (
    <ItemsList
      className={className}
      {...items}
      onItemClick={verse => goToVerse(verse as IRSearchVerse)}
    />
  )
}

export default VersesSHList
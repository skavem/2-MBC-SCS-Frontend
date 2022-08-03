import React from 'react'

import { IRSearchVerse } from '../../models'
import useStoreItems from '../../hooks/useStoreItems'
import { store, storeReducersEnum } from '../../store'
import ItemsList from '../item-list/ItemsList'
import { useAppDispatch } from '../../hooks/redux'
import { setActiveBook } from '../../store/actions/BiblePage/booksActions'
import { setActiveChapter } from '../../store/actions/BiblePage/chaptersActions'
import { setActiveVerse } from '../../store/actions/BiblePage/versesActions'
import { XIcon } from '@heroicons/react/solid'
import { removeFromHistory } from '../../store/actions/BiblePage/versesSHActions'

const VersesSHList = ({ className = '' }: { className?: string }) => {
  const items = useStoreItems(storeReducersEnum.versesSH)

  const dispatch = useAppDispatch()

  const goToVerse = (verseTo: IRSearchVerse) => {
    const book = store
      .getState()[storeReducersEnum.books]
      .list
      .find(book => book.id === verseTo.book_id)
    dispatch(setActiveBook(book!))

    setTimeout(() => {
      const chapter = store
        .getState()[storeReducersEnum.chapters]
        .list
        .find(chapter => chapter.id === verseTo.chapter_id)
      dispatch(setActiveChapter(chapter!))
    }, 200)


    setTimeout(() => {
      const verse = store
        .getState()[storeReducersEnum.verses]
        .list
        .find(verse => verse.id === verseTo.id)
      dispatch(setActiveVerse(verse!))
    }, 400)
  }

  return (
    <ItemsList
      className={className}
      {...items}
      onItemClick={verse => goToVerse(verse as IRSearchVerse)}
      rightButtons={
        [
          {
            name: 'delete',
            onClick: item => dispatch(
              removeFromHistory(item as IRSearchVerse)
            ),
            className: `ml-auto invisible group-hover:visible p-1
            hover:bg-gray-700 rounded-md hover:text-white 
            border-2 border-gray-500 hover:border-transparent 
            text-gray-500`,
            children: <XIcon className='h-4' />
          }
        ]
      }
    />
  )
}

export default VersesSHList
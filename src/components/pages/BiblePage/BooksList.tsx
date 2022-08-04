import React from 'react'
import { useAppDispatch } from '../../../hooks/redux'
import useStoreItems from '../../../hooks/useStoreItems'
import { IRBook, ISObjectWRKey } from '../../../models'
import { storeReducersEnum } from '../../../store'
import { setActiveBook } from '../../../store/actions/BiblePage/booksActions'
import ItemsList from '../../items-list/ItemsList'

const BooksList = ({ className }: { className: string }) => {
  const items = useStoreItems(storeReducersEnum.books)

  const dispatch = useAppDispatch()

  return (
    <ItemsList
      className={className}
      {...items}
      onItemClick={
        (book: ISObjectWRKey) => dispatch(setActiveBook(book as IRBook))
      }
    />
  )
}

export default BooksList
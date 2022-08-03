import React from 'react'
import { useAppDispatch } from '../../hooks/redux'
import useStoreItems from '../../hooks/useStoreItems'
import { IRChapter, ISObjectWRKey } from '../../models'
import { storeReducersEnum } from '../../store'
import { setActiveChapter } from '../../store/actions/BiblePage/chaptersActions'
import ItemsList from '../item-list/ItemsList'

const ChaptersList = ({ className }: { className: string }) => {
  const items = useStoreItems(storeReducersEnum.chapters)

  const dispatch = useAppDispatch()

  return (
    <ItemsList
      {...items}
      className={className}
      onItemClick={
        (chapter: ISObjectWRKey) => dispatch(
          setActiveChapter(chapter as IRChapter)
        )
      }
    />
  )
}

export default ChaptersList
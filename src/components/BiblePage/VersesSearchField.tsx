import React from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { flipToHistory } from '../../store/actions/BiblePage/versesSHActions'
import { WSSingletone } from '../../websocket/wsSingletone'
import SearchField from '../SearchField'

const VersesSearchField = ({ className = '' }: { className?: string }) => {
  const dispatch = useAppDispatch()

  return (
    <SearchField
      className={className}
      onSearch={debounced => {
        if (debounced.length > 2) {
          WSSingletone.get().searchVerse(debounced)
        } else {
          dispatch(flipToHistory())
        }
      }}
    />
  )
}

export default VersesSearchField
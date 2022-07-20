import { SearchIcon, XIcon } from '@heroicons/react/solid'
import React, { useCallback, useEffect } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { useDebounce } from '../../hooks/useDebounce'
import { useInput } from '../../hooks/useInput'
import { flipToHistory } from '../../store/actions/BiblePage/versesSHActions'
import { WSSingletone } from '../../websocket/wsSingletone'

const SearchField = ({ className = '' }: { className?: string }) => {
  const {input, setValue} = useInput()
  const debounced = useDebounce(input.value)

  const dispatch = useAppDispatch()

  const searchVerse = useCallback(() => {
    if (debounced.length > 2) {
      WSSingletone.get().searchVerse(debounced)
    } else {
      dispatch(flipToHistory())
    }
  }, [debounced, dispatch])

  useEffect(() => {
    searchVerse()
  }, [searchVerse])

  return (
    <div className={className}>
      <input
        {...input}
        className='border-2 border-gray-400 rounded-lg h-[42px] 
        px-2 grow rounded-r-none border-r-0'
        placeholder='Текст или ссылка:'
      />

      <button
        className="border-2 border-gray-400 rounded-lg h-[42px] px-4
        hover:bg-gray-500 hover:border-gray-500 hover:text-white 
        transition-colors rounded-l-none rounded-r-none border-r-0"
        onClick={() => {setValue('')}}
      >
        <XIcon className='h-5' />
      </button>

      <button
        className="border-2 border-gray-400 rounded-lg h-[42px] px-4
        hover:bg-gray-500 hover:border-gray-500 hover:text-white 
        transition-colors rounded-l-none"
        onClick={searchVerse}
      >
        <SearchIcon className='h-5' />
      </button>
    </div>
  )
}

export default SearchField
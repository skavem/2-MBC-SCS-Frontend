import React, { useCallback, useEffect } from 'react'

import { SearchIcon, XIcon } from '@heroicons/react/solid'
import { useInput } from '../hooks/useInput'
import { useDebounce } from '../hooks/useDebounce'

const SearchField = (
  {
    className = '',
    onSearch
  }:
    {
      className?: string,
      onSearch: (data: string) => void
    }
) => {
  const { input, setValue } = useInput()
  const debounced = useDebounce(input.value)

  const searchVerse = useCallback(() => {
    onSearch(debounced)
  }, [debounced, onSearch])

  useEffect(() => {
    searchVerse()
  }, [searchVerse])

  return (
    <div className={'flex items-center justify-center ' + className}>
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
        onClick={() => { setValue('') }}
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
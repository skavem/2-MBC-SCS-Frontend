import React from 'react'

import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'

import { useAppSelector } from '../../hooks/redux'
import { WSSingletone } from '../../websocket/wsSingletone'

const ShowHideVerseButton = ({ className = '' }: { className?: string }) => {
  const isShown = useAppSelector(state => state.recv.verse) !== null
  const activeVerse = useAppSelector(state => state.verses.active)

  const onButtonClick = () => {
    if (isShown) {
      WSSingletone.get().hideVerse()
    } else {
      WSSingletone.get().showVerse(activeVerse!)
    }
  }

  return (
    <div className={className}>
      <button
        className='flex items-center bg-gray-500 
        text-white rounded-lg px-4 py-2 
        hover:bg-gray-700 transition-colors'
        onClick={onButtonClick}
      >
        {!isShown ?
          <><EyeIcon className='h-5 mr-2' />Показать</> :
          <><EyeOffIcon className='h-5 mr-2' />Спрятать</>}
      </button>
    </div>
  )
}

export default ShowHideVerseButton
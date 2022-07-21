import React from 'react'

import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'

const ShowHideButton = (
  {
    className = '',
    onButtonClick,
    isShown
  }:
    {
      className?: string,
      onButtonClick: () => void,
      isShown: boolean
    }
) => {
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

export default ShowHideButton
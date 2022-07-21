import React from 'react'
import BooksList from '../components/BiblePage/BooksList'
import ChaptersList from '../components/BiblePage/ChaptersList'
import VersesSearchField from '../components/BiblePage/VersesSearchField'
import ShowHideVerseButton from '../components/BiblePage/ShowHideVerseButton'
import VersesList from '../components/BiblePage/VersesList'
import VersesSHList from '../components/BiblePage/VersesSHList'

const BiblePage = () => {
  return (
    <div className='flex h-full w-full p-6'>
      <BooksList className='h-full w-1/5 mr-2' />
      <div className='flex flex-col w-full h-full'>
        <div className='flex w-full h-1/2 mb-2'>
          <ChaptersList className='w-16 h-full mr-2' />
          <VersesList className='w-full h-full' />
        </div>
        <ShowHideVerseButton
          className='flex items-center justify-center mb-2'
        />
        <VersesSearchField
          className='w-full mb-2'
        />
        <div className='flex w-full grow min-h-0'>
          <VersesSHList className='w-full h-full' />
        </div>
      </div>
    </div>
  )
}

export default BiblePage
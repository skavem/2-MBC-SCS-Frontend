import React from 'react'
import SearchField from '../components/SearchField'
import CoupletsList from '../components/SongsPage/CoupletsList'
import ShowHideCoupletButton from '../components/SongsPage/ShowHideCoupletButton'
import SongsList from '../components/SongsPage/SongsList'
import { WSSingletone } from '../websocket/wsSingletone'

const SongsPage = () => {
  return (
    <div className='flex flex-row h-full w-full p-6'>
      <div className='flex flex-col w-1/3 h-full mr-2'>
        <SearchField
          className='w-full mb-2'
          onSearch={debounced => WSSingletone.get().searchSong(debounced)}
        />
        <div className='min-h-0'>
          <SongsList className='w-full h-full' />
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <CoupletsList
          className='w-full h-1/2 mb-2'
        />
        <ShowHideCoupletButton className='flex justify-center mb-2'/>
      </div>
    </div>
  )
}

export default SongsPage
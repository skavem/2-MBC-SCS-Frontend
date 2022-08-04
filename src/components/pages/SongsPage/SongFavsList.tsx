import { XIcon } from '@heroicons/react/solid'
import React from 'react'
import { useAppDispatch } from '../../../hooks/redux'
import useStoreItems from '../../../hooks/useStoreItems'
import { IRFavSong, } from '../../../models'
import { storeReducersEnum } from '../../../store'
import {
  removeSongFav,
  setActivSongFav
} from '../../../store/actions/SongsPage/songFavsActions'
import ItemsList from '../../items-list/ItemsList'

const SongFavsList = ({ className = '' }: { className?: string }) => {
  const songs = useStoreItems(storeReducersEnum.songFavs)

  const dispatch = useAppDispatch()

  return (
    <ItemsList
      className={className}
      {...songs}
      onItemClick={item => dispatch(setActivSongFav(item as IRFavSong))}
      rightButtons={[
        {
          name: 'fav',
          onClick(item) {
            dispatch(removeSongFav(item as IRFavSong))
          },
          className: `ml-auto invisible rounded-md group-hover:visible p-1
          transition-all`,
          activeClassName: `text-white hover:bg-white hover:text-gray-700`,
          nonActiveClassName: `hover:bg-gray-500 hover:text-white 
          text-gray-700`,
          children: (<XIcon className='h-4' />)
        }
      ]}
    />
  )
}

export default SongFavsList
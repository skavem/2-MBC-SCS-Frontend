import { StarIcon } from '@heroicons/react/solid'
import React from 'react'
import { useAppDispatch } from '../../../hooks/redux'
import useStoreItems from '../../../hooks/useStoreItems'
import { IRSong } from '../../../models'
import { storeReducersEnum } from '../../../store'
import { addSongFav } from '../../../store/actions/SongsPage/songFavsActions'
import { setActiveSong } from '../../../store/actions/SongsPage/songsActions'
import ItemsList from '../../items-list/ItemsList'

const SongsList = ({ className = '' }: { className?: string }) => {
  const items = useStoreItems(storeReducersEnum.songs)

  const dispatch = useAppDispatch()

  return (
    <ItemsList
      className={className}
      {...items}
      onItemClick={item => dispatch(setActiveSong(item as IRSong))}
      rightButtons={[
        {
          name: 'fav',
          onClick(item) {
            dispatch(addSongFav(item as IRSong))
          },
          className: `ml-auto invisible rounded-md group-hover:visible p-1
          transition-all`,
          activeClassName: `text-white hover:bg-white hover:text-gray-700`,
          nonActiveClassName: `hover:bg-gray-500 hover:text-white 
          text-gray-700`,
          children: (<StarIcon className='h-4'/>)
        }
      ]}
    />
  )
}

export default SongsList
import React from 'react'
import { useAppDispatch } from '../../hooks/redux'
import useStoreItems from '../../hooks/useStoreItems'
import { IRSong } from '../../models'
import { storeReducersEnum } from '../../store'
import { setActiveSong } from '../../store/actions/SongsPage/songsActions'
import ItemsList from '../ItemsList'

const SongsList = ({className = ''}: {className?: string}) => {
  const items = useStoreItems(storeReducersEnum.songs)

  const dispatch = useAppDispatch()

  return (
    <ItemsList 
      className={className}
      {...items}
      onItemClick={item => dispatch(setActiveSong(item as IRSong))}
    />
  )
}

export default SongsList
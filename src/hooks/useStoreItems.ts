import React from 'react'
import { storeReducersEnum } from '../store'
import { useAppSelector } from './redux'

const useStoreItems = (sliceName: string) => {
  const items = useAppSelector(
    state => state[sliceName as storeReducersEnum].list
  )
  const activeItem = useAppSelector(
    state => state[sliceName as storeReducersEnum].active
  )

  return {items, activeItem}
}

export default useStoreItems
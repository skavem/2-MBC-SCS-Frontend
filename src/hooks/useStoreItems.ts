import React from 'react'
import { storeReducersEnum } from '../store'
import { useAppSelector } from './redux'

const useStoreItems = (sliceName: storeReducersEnum) => {
  const items = useAppSelector(
    state => state[sliceName].list
  )
  const activeItem = useAppSelector(
    state => state[sliceName].active
  )

  return {items, activeItem}
}

export default useStoreItems
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useStoreItems from '../../hooks/useStoreItems'
import { IRCouplet } from '../../models'
import { storeReducersEnum } from '../../store'
import { setActiveCouplet } from '../../store/actions/SongsPage/coupletsActions'
import { WSSingletone } from '../../websocket/wsSingletone'
import ItemsList from '../ItemsList'

const CoupletsList = ({ className }: { className: string }) => {
  const items = useStoreItems(storeReducersEnum.couplets)
  const shownCouplet = useAppSelector(state => state.recv.couplet)

  const dispatch = useAppDispatch()

  return (
    <ItemsList
      className={className}
      {...items}
      onItemClick={
        couplet => dispatch(setActiveCouplet(couplet as IRCouplet))
      }
      onDoubleItemClick={
        couplet => WSSingletone.get().showCouplet(couplet.id as number)
      }
      isItemShown={couplet => couplet.id === shownCouplet?.id}
    />
  )
}

export default CoupletsList
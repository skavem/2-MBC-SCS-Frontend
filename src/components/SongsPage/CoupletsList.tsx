import React from 'react'

import { PencilIcon, PlusIcon, XIcon } from '@heroicons/react/solid'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useStoreItems from '../../hooks/useStoreItems'
import { IRCouplet } from '../../models'
import { storeReducersEnum } from '../../store'
import { setActiveCouplet } from '../../store/actions/SongsPage/coupletsActions'
import { WSSingletone } from '../../websocket/wsSingletone'
import ItemsList from '../item-list/ItemsList'
import { setCoupletModalEdit, setCoupletModalFullName, setCoupletModalInsertAfter, setCoupletModalMark, setCoupletModalShown } from '../../store/actions/SongsPage/coupletModalActions'
import { useCoupletsHotkeys } from '../../hooks/useCoupletsHotkeys'

const CoupletsList = ({ className }: { className: string }) => {
  const items = useStoreItems(storeReducersEnum.couplets)
  const shownCouplet = useAppSelector(state => state.recv.couplet)

  const dispatch = useAppDispatch()

  useCoupletsHotkeys()

  return (
    <ItemsList
      className={className}
      itemClassName={'hover:pb-3 hover:mb-3'}
      {...items}
      onItemClick={
        couplet => dispatch(setActiveCouplet(couplet as IRCouplet))
      }
      onDoubleItemClick={
        couplet => WSSingletone.get().showCouplet(couplet.id as number)
      }
      isItemShown={couplet => couplet.id === shownCouplet?.id}
      listTopButton={
        {
          name: 'add-new',
          onClick() {
            dispatch(setCoupletModalMark(''))
            dispatch(setCoupletModalFullName(''))
            dispatch(setCoupletModalInsertAfter(-1))
            dispatch(setCoupletModalShown(true))
          },
          className: `flex justify-center rounded-full p-1 mx-2 mb-1 
          transition-all hover:bg-gray-300 text-gray-700 cursor-pointer`,
          children: (<PlusIcon className='h-5' />)
        }
      }
      rightButtons={[
        {
          name: 'edit',
          onClick(item) {
            dispatch(setCoupletModalMark(item.mark as string))
            dispatch(setCoupletModalFullName(item.fullName as string))
            dispatch(setCoupletModalEdit(item as IRCouplet))
            dispatch(setCoupletModalShown(true))
          },
          className: `ml-auto invisible rounded-md group-hover:visible p-1
          transition-all`,
          activeClassName: `text-white hover:bg-white hover:text-gray-700`,
          nonActiveClassName: `hover:bg-gray-500 hover:text-white 
          text-gray-700`,
          children: (<PencilIcon className='h-5' />)
        },
        {
          name: 'remove',
          onClick(item) {
            WSSingletone.get().deleteCouplet(item.id as number)
          },
          className: `invisible rounded-md group-hover:visible p-1
          transition-all`,
          activeClassName: `text-white hover:bg-white hover:text-gray-700`,
          nonActiveClassName: `hover:bg-gray-500 hover:text-white 
          text-gray-700`,
          children: (<XIcon className='h-5' />)
        }
      ]}
      bottomButtons={[
        {
          name: 'add-after',
          onClick(item) {
            dispatch(setCoupletModalInsertAfter(item.id as number))
            dispatch(setCoupletModalShown(true))
          },
          className: `flex justify-center fixed absolute 
          inset-x-0 bottom-0 -bottom-3 z-60`,
          children: (<PlusIcon
            className={`p-1 h-6 text-gray-500 rounded-full invisible 
            shadow-gray-500 shadow-md bg-white group-hover:visible
            transition-colors hover:bg-gray-500 hover:text-white`}
          />)
        }
      ]}
    />
  )
}

export default CoupletsList
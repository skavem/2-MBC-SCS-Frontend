import React, { useEffect, useRef } from 'react'

import { ISObjectWRKey } from '../models'
import { IItemRightButton } from '../models/ui'
import isScrollNeeded from '../utils/isScrollNeeded'
import Item from './Item'

const ItemsList = (
  {
    className,
    items,
    activeItem,
    isItemShown = a => false,
    onItemClick,
    onDoubleItemClick = _ => { },
    rightButtons
  }:
    {
      className: string,
      items: ISObjectWRKey[],
      activeItem: ISObjectWRKey | null,
      isItemShown?: (item: ISObjectWRKey) => boolean,
      onItemClick: (item: ISObjectWRKey) => void,
      onDoubleItemClick?: (item: ISObjectWRKey) => void
      rightButtons?: IItemRightButton[]
    }
) => {
  const activeRef = useRef<HTMLDivElement | null>(null)
  const list = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (activeRef.current === null || list.current === null) return
    if (isScrollNeeded(activeRef.current!, list.current!)) {
      activeRef.current?.scrollIntoView({ block: 'center' })
    }
  }, [activeItem])

  return (
    <div
      ref={list}
      className={
        'border-2 rounded-lg border-gray-400 '
        + 'overflow-y-scroll custom-scrollbar select-none '
        + className
      }
    >
      {items?.map(item => {
        const isActive = item.reactKey === activeItem?.reactKey
        return (
          <Item
            item={item}
            forwardRef={isActive ? activeRef : null}
            isActive={isActive}
            isShown={isItemShown}
            onClick={onItemClick}
            onDoubleClick={onDoubleItemClick}
            key={item.reactKey}
            rightButtons={rightButtons}
          />
        )
      })}
    </div>
  )
}

export default ItemsList
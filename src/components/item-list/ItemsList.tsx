import React, { useEffect, useRef } from 'react'

import { ISObjectWRKey } from '../../models'
import { IItemButton, IListButton } from '../../models/ui'
import isScrollNeeded from '../../utils/isScrollNeeded'
import Item from './Item'
import ItemButton from './ItemButton'

const ItemsList = (
  {
    className,
    itemClassName,
    items,
    activeItem,
    isItemShown = a => false,
    onItemClick,
    onDoubleItemClick = _ => { },
    rightButtons,
    bottomButtons,
    listTopButton
  }:
    {
      className: string,
      itemClassName?: string,
      items: ISObjectWRKey[],
      activeItem: ISObjectWRKey | null,
      isItemShown?: (item: ISObjectWRKey) => boolean,
      onItemClick: (item: ISObjectWRKey) => void,
      onDoubleItemClick?: (item: ISObjectWRKey) => void
      rightButtons?: IItemButton[]
      bottomButtons?: IItemButton[]
      listTopButton?: IListButton
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
        'border-2 rounded-lg border-gray-400 py-1 '
        + 'overflow-y-scroll custom-scrollbar select-none '
        + className
      }
    >
      {listTopButton &&
        <ItemButton
          className={listTopButton.className}
          name={listTopButton.name}
          onClick={listTopButton.onClick}
        >
          {listTopButton.children}
        </ItemButton>
      }
      {items?.map(item => {
        const isActive = item.reactKey === activeItem?.reactKey
        return (
          <Item
            className={itemClassName}
            item={item}
            forwardRef={isActive ? activeRef : null}
            isActive={isActive}
            isShown={isItemShown}
            onClick={onItemClick}
            onDoubleClick={onDoubleItemClick}
            key={item.reactKey}
            rightButtons={rightButtons}
            bottomButtons={bottomButtons}
          />
        )
      })}
    </div>
  )
}

export default ItemsList
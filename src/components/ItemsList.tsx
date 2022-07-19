import React, { useEffect, useRef } from 'react'

import { EyeIcon } from '@heroicons/react/solid'

import { ISObjectWRKey } from '../models'
import isScrollNeeded from '../utils/isScrollNeeded'

const ItemsList = (
  {
    className,
    items,
    activeItem,
    isItemShown = a => false,
    onItemClick,
    onDoubleItemClick = _ => { },
  }:
    {
      className: string,
      items: ISObjectWRKey[],
      activeItem: ISObjectWRKey | null,
      isItemShown?: (item: ISObjectWRKey) => boolean,
      onItemClick: (item: ISObjectWRKey) => void,
      onDoubleItemClick?: (item: ISObjectWRKey) => void
    }
) => {
  const active = useRef<HTMLDivElement | null>(null)
  const list = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (active.current === null || list.current === null) return
    if (isScrollNeeded(active.current!, list.current!)) {
      active.current?.scrollIntoView({ block: 'center' })
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
          <div
            ref={isActive ? active : null}
            onClick={() => onItemClick(item)}
            onDoubleClick={() => onDoubleItemClick(item)}
            className={
              'py-1 px-3 cursor-pointer transition-colors '
              + (isActive ?
                'bg-gray-500 hover:bg-gray-600 text-white ' :
                'hover:bg-gray-300 ')
            }
            key={item.reactKey}
          >
            {isItemShown(item) &&
                <EyeIcon className='h-5 mr-1 inline-flex items-baseline' />
            }
            {item.mark &&
              <span
                className='bg-teal-100 text-black 
                rounded px-2 mr-1 font-medium'
              >
                {item.mark}
              </span>
            }
            <span>{item.fullName}</span>
          </div>
        )
      })}
    </div>
  )
}

export default ItemsList
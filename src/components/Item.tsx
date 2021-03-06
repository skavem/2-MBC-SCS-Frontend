import React from 'react'

import { EyeIcon } from '@heroicons/react/solid'

import { ISObjectWRKey } from '../models'
import { IItemButton } from '../models/ui'
import ItemButton from './ItemButton'

const Item = ({
  className,
  item,
  isActive,
  onClick,
  onDoubleClick = _ => { },
  isShown = _ => false,
  forwardRef,
  children,
  rightButtons,
  bottomButtons,
}: {
  className?: string
  item: ISObjectWRKey
  isActive: boolean
  onClick: (item: ISObjectWRKey) => void
  onDoubleClick?: (item: ISObjectWRKey) => void
  isShown?: (item: ISObjectWRKey) => boolean
  forwardRef: React.MutableRefObject<HTMLDivElement | null> | null
  children?: React.PropsWithChildren
  rightButtons?: IItemButton[]
  bottomButtons?: IItemButton[]
}) => {
  return (
    <div
      ref={forwardRef}
      onClick={() => onClick(item)}
      onDoubleClick={() => onDoubleClick(item)}
      className={
        `relative py-1 px-3 cursor-pointer transition-all 
        flex flex-row items-center group  
        ${isActive ?
          'bg-gray-500 hover:bg-gray-600 text-white ' :
          'hover:bg-gray-300'} 
        ${className}`
      }
    >
      {isShown(item) &&
        <EyeIcon className='h-5 mr-2 inline-flex items-baseline' />
      }
      <div>
        {item.mark &&
          <span
            className='bg-teal-100 text-black
                  rounded px-2 mr-2 font-medium'
          >
            {item.mark}
          </span>
        }
        <span>{item.fullName}</span>
      </div>
      {
        rightButtons?.map(button => (
          <ItemButton
            name={button.name}
            onClick={() => button.onClick(item)}
            className={
              `${button.className} ${isActive ?
                button.activeClassName :
                button.nonActiveClassName
              }`
            }
            key={`${item.reactKey}-${button.name as string}`}
          >
            {button.children}
          </ItemButton>
        ))
      }
      {
        bottomButtons?.map(button => (
          <ItemButton
            name={button.name}
            onClick={() => button.onClick(item)}
            className={
              `${button.className} ${isActive ?
                button.activeClassName :
                button.nonActiveClassName
              }`
            }
            key={`${item.reactKey}-${button.name as string}`}
          >
            {button.children}
          </ItemButton>
        ))
      }
    </div>
  )
}

export default Item
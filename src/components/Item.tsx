import React from 'react'

import { EyeIcon, XIcon } from '@heroicons/react/solid'

import { ISObjectWRKey } from '../models'
import { IItemRightButton } from '../models/ui'
import ItemRightButton from './ItemRightButton'

const Item = ({
  item,
  isActive,
  onClick,
  onDoubleClick = _ => { },
  isShown = _ => false,
  forwardRef,
  children,
  rightButtons
}: {
  item: ISObjectWRKey
  isActive: boolean
  onClick: (item: ISObjectWRKey) => void
  onDoubleClick?: (item: ISObjectWRKey) => void
  isShown?: (item: ISObjectWRKey) => boolean
  forwardRef: React.MutableRefObject<HTMLDivElement | null> | null
  children?: React.PropsWithChildren
  rightButtons?: IItemRightButton[]
}) => {
  return (
    <div
      ref={forwardRef}
      onClick={() => onClick(item)}
      onDoubleClick={() => onDoubleClick(item)}
      className={
        'py-1 px-3 cursor-pointer transition-colors '
        + 'flex flex-row items-center group '
        + (isActive ?
          'bg-gray-500 hover:bg-gray-600 text-white ' :
          'hover:bg-gray-300 ')
      }
    >
      {isShown(item) &&
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
      {rightButtons?.map(button =>
      (<ItemRightButton
        name={button.name}
        onClick={() => button.onClick(item)}
        className={button.className}
        key={`${item.reactKey}-${button.name as string}`}
      >
        {button.children}
      </ItemRightButton>)
      )}
    </div>
  )
}

export default Item
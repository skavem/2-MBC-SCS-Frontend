import React from 'react'

interface IItemButton {
  className?: string
  onClick: () => void
  children?: JSX.Element
  name: string
}

const ItemButton = ({
  className,
  onClick,
  children,
  name
}: IItemButton) => {
  return (
    <div
      onClick={e => {e.stopPropagation(); onClick()}}
      className={className}
    >
      {children}
    </div>
  )
}

export default ItemButton
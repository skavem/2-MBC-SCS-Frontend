import React from 'react'

interface IItemRightButton {
  className?: string
  onClick: () => void
  children?: JSX.Element
  name: string
}

const ItemRightButton = ({
  className,
  onClick,
  children,
  name
}: IItemRightButton) => {
  return (
    <div
      onClick={e => {e.stopPropagation(); onClick()}}
      className={className}
    >
      {children}
    </div>
  )
}

export default ItemRightButton
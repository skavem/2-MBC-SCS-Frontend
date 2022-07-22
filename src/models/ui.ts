import { ISObjectWRKey } from "."

export interface IItemButton {
  className?: string
  onClick: (item: ISObjectWRKey) => void
  children?: JSX.Element
  name: string
  activeClassName?: string
  nonActiveClassName?: string
}

export interface IListButton extends IItemButton {
  onClick: () => void
}
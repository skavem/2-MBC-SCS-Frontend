import { ISObjectWRKey } from "."

export interface IItemRightButton {
  className?: string
  onClick: (item: ISObjectWRKey) => void
  children?: JSX.Element
  name: string
  activeClassName?: string
  nonActiveClassName?: string
}
export interface IPage {
  path: string,
  name: string,
  default?: boolean
}

export const appPages: IPage[] = [
  { path: '/Bible', name: 'Библия', default: true},
  { path: '/Songs', name: 'Песни'},
]

export default appPages
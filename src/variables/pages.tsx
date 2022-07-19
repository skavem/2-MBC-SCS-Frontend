export interface IPage {
  path: string,
  name: string
}

export const appPages: IPage[] = [
  { path: '/Bible', name: 'Библия'},
  { path: '/Songs', name: 'Песни'},
]

export default appPages
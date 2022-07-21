import { ISObject, ISObjectWRKey } from "../models"
import { store, storeReducersEnum } from "../store"

export const findElemInSlice = (
  elem: ISObject,
  sliceName: storeReducersEnum
) => {
  const list: ISObjectWRKey[] = store.getState()[sliceName].list
  return list.filter(lelem => lelem.id === elem.id)[0]
}

export default findElemInSlice
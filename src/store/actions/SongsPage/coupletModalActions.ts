import { AppDispatch } from "../.."
import { IRCouplet } from "../../../models"
import { coupletModalSlice } from "../../slices/SongsPage/coupletModalSlice"

export const setCoupletModalMark = (mark: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(coupletModalSlice.actions.setMark(mark))
  }
}

export const setCoupletModalFullName = (fullName: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(coupletModalSlice.actions.setFullName(fullName))
  }
}

export const setCoupletModalShown = (isShown: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(coupletModalSlice.actions.setModalShown(isShown))
  }
}

export const setCoupletModalInsertAfter = (coupletId: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(coupletModalSlice.actions.setInsertAfter(coupletId))
    dispatch(coupletModalSlice.actions.setEdit(null))
  }
}

export const setCoupletModalEdit= (couplet: IRCouplet) => {
  return async (dispatch: AppDispatch) => {
    dispatch(coupletModalSlice.actions.setEdit(couplet.id))
    dispatch(coupletModalSlice.actions.setInsertAfter(null))
  }
}

export const clearCoupletModal = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(coupletModalSlice.actions.clear())
  }
}
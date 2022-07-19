import { AppDispatch } from "..";
import { IShownCouplet, IShownVerse } from "../../models/recv";
import { recvSlice } from "../slices/recvSlice";

export const setShownVerse = (verse: IShownVerse | null) => {
  return async (dispatch: AppDispatch) => {
    dispatch(recvSlice.actions.setVerse(verse))
  }
}

export const setShownCouplet = (couplet: IShownCouplet | null) => {
  return async (dispatch: AppDispatch) => {
    dispatch(recvSlice.actions.setCouplet(couplet))
  }
}
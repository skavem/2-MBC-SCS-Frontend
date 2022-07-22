import { v4 } from "uuid";
import { AppDispatch } from "../..";
import { ICouplet, IRCouplet } from "../../../models";
import { coupletsSlice } from "../../slices/SongsPage/coupletsSlice";

export const setCouplets = (couplets: ICouplet[]) => {
  return async (dispatch: AppDispatch) => {
    const rCouplets: IRCouplet[] = couplets.map(couplet => ({
      ...couplet,
      reactKey: v4()
    }))
    dispatch(coupletsSlice.actions.setCouplets(rCouplets))
    dispatch(setActiveCouplet(rCouplets[0]))
  }
}

export const setActiveCouplet = (couplet: IRCouplet) => {
  return async (dispatch: AppDispatch) => {
    dispatch(coupletsSlice.actions.setActiveCouplet(couplet))
  }
}

export const setNextCoupletActive = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(coupletsSlice.actions.setNextActive())
  }
}

export const setPrevCoupletActive = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(coupletsSlice.actions.setPrevActive())
  }
}
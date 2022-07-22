import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISOWRKSlice } from "../..";
import { IRCouplet } from "../../../models";

const initialState: ISOWRKSlice<IRCouplet> = {
  list: [],
  active: null
}

export const coupletsSlice = createSlice({
  name: 'couplets',
  initialState,
  reducers: {
    setCouplets(state, action: PayloadAction<IRCouplet[]>) {
      state.list = action.payload
    },
    setActiveCouplet(state, action: PayloadAction<IRCouplet>) {
      state.active = action.payload
    },
    setNextActive(state) {
      const curCouplet = state.active
      const nextCoupletInd = state.list.findIndex(
        couplet => curCouplet?.reactKey === couplet.reactKey
      ) + 1
      if (nextCoupletInd < state.list.length) {
        state.active = state.list[nextCoupletInd]
      }
    },
    setPrevActive(state) {
      const curCouplet = state.active
      const prevCoupletInd = state.list.findIndex(
        couplet => curCouplet?.reactKey === couplet.reactKey
      ) - 1
      if (prevCoupletInd >= 0) {
        state.active = state.list[prevCoupletInd]
      }
    }
  }
})

export default coupletsSlice.reducer
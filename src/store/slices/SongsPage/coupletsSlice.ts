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
    }
  }
})

export default coupletsSlice.reducer
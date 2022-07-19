import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISOWRKSlice } from "../..";
import { IRVerse } from "../../../models";

const initialState: ISOWRKSlice<IRVerse> = {
  list: [],
  active: null,
}

export const versesSlice = createSlice({
  name: 'verses',
  initialState,
  reducers: {
    setVerses(state, action: PayloadAction<IRVerse[]>) {
      state.list = action.payload
    },
    setActiveVerse(state, action: PayloadAction<IRVerse>) {
      state.active = action.payload
    }
  }
})

export default versesSlice.reducer
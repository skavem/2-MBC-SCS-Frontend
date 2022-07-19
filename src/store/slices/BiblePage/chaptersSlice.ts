import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISOWRKSlice } from "../..";
import { IRChapter } from "../../../models";

const initialState: ISOWRKSlice<IRChapter> = {
  list: [],
  active: null,
}

export const chaptersSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setChapters(state, action: PayloadAction<IRChapter[]>) {
      state.list = action.payload
    },
    setActiveChapter(state, action: PayloadAction<IRChapter>) {
      state.active = action.payload
    }
  }
})

export default chaptersSlice.reducer
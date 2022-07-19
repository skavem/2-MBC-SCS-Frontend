import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISOWRKSlice } from "../..";
import { IRSearchVerse } from "../../../models";

interface ISOWRKFlippableSlice extends ISOWRKSlice<IRSearchVerse> {
  history: IRSearchVerse[]
}

const initialState: ISOWRKFlippableSlice = {
  list: [],
  active: null,
  history: [],
}

export const versesSHSlice = createSlice({
  name: 'versesSH',
  initialState,
  reducers: {
    setVerses(state, action: PayloadAction<IRSearchVerse[]>) {
      state.list = action.payload
    },
    setActiveVerse(state, action: PayloadAction<IRSearchVerse>) {
      state.active = action.payload
    },
    addToHistory(state, action: PayloadAction<IRSearchVerse>) {
      state.history.unshift(action.payload)
    },
    flipToHistory(state, action: PayloadAction<undefined>) {
      state.list = state.history
    }
  }
})

export default versesSHSlice.reducer
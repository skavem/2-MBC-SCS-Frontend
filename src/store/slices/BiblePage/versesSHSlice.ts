import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISOWRKSlice } from "../..";
import { IRSearchVerse } from "../../../models";

interface ISOWRKFlippableSlice extends ISOWRKSlice<IRSearchVerse> {
  history: IRSearchVerse[],
  historyShown: boolean
}

const initialState: ISOWRKFlippableSlice = {
  list: [],
  active: null,
  history: [],
  historyShown: true
}

export const versesSHSlice = createSlice({
  name: 'versesSH',
  initialState,
  reducers: {
    setVerses(state, action: PayloadAction<IRSearchVerse[]>) {
      state.list = action.payload
      state.historyShown = false
    },
    setActiveVerse(state, action: PayloadAction<IRSearchVerse>) {
      state.active = action.payload
    },
    addToHistory(state, action: PayloadAction<IRSearchVerse>) {
      state.history.unshift(action.payload)
    },
    flipToHistory(state, action: PayloadAction<undefined>) {
      state.historyShown = true
      state.list = state.history
    },
    removeFromHisory(state, action: PayloadAction<IRSearchVerse>) {
      state.history = state.history.filter(
        verse => verse.reactKey !== action.payload.reactKey
      )
      state.list = state.list.filter(
        verse => verse.reactKey !== action.payload.reactKey
      )
    }
  }
})

export default versesSHSlice.reducer
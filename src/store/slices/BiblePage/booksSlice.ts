import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISOWRKSlice } from "../..";
import { IRBook } from "../../../models";

const initialState: ISOWRKSlice<IRBook> = {
  list: [],
  active: null,
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<IRBook[]>) {
      state.list = action.payload
    },
    setActiveBook(state, action: PayloadAction<IRBook>) {
      state.active = action.payload
    }
  }
})

export default booksSlice.reducer
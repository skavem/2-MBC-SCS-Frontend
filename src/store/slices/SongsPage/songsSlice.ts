import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISOWRKSlice } from "../..";
import { IRSong } from "../../../models";

const initialState: ISOWRKSlice<IRSong> = {
  list: [],
  active: null
}

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs(state, action: PayloadAction<IRSong[]>) {
      state.list = action.payload
    },
    setActiveSong(state, action: PayloadAction<IRSong>) {
      state.active = action.payload
    }
  }
})

export default songsSlice.reducer
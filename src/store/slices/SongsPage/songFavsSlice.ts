import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISOWRKSlice } from "../..";
import { IRSong } from "../../../models";

const initialState: ISOWRKSlice<IRSong> = {
  list: [],
  active: null
}

export const songFavsSlice = createSlice({
  name: 'songFavs',
  initialState,
  reducers: {
    setSongFavs(state, action: PayloadAction<IRSong[]>) {
      state.list = action.payload
    },
    setActiveSongFav(state, action: PayloadAction<IRSong>) {
      state.active = action.payload
    },
    removeSongFav(state, action: PayloadAction<IRSong>) {
      state.list = state.list.filter(
        song => song.reactKey === action.payload.reactKey
      )
    }
  }
})

export default songFavsSlice.reducer
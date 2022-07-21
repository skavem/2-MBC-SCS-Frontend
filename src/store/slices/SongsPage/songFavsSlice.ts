import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISOWRKSlice } from "../..";
import { IRFavSong, IRSong } from "../../../models";

const initialState: ISOWRKSlice<IRFavSong> = {
  list: [],
  active: null
}

export const songFavsSlice = createSlice({
  name: 'songFavs',
  initialState,
  reducers: {
    addSongFav(state, action: PayloadAction<IRFavSong>) {
      state.list.unshift(action.payload)
    },
    setActiveSongFav(state, action: PayloadAction<IRFavSong>) {
      state.active = action.payload
    },
    removeSongFav(state, action: PayloadAction<IRFavSong>) {
      state.list = state.list.filter(
        song => song.reactKey !== action.payload.reactKey
      )
    }
  }
})

export default songFavsSlice.reducer
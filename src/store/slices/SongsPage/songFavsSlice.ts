import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISOWRKSlice } from "../..";
import { IRFavSong } from "../../../models";

const storageName = 'FavouriteSongs'

const initialList = window.localStorage.getItem(storageName) || '[]'

const initialState: ISOWRKSlice<IRFavSong> = {
  list: JSON.parse(initialList),
  active: null
}

export const songFavsSlice = createSlice({
  name: 'songFavs',
  initialState,
  reducers: {
    addSongFav(state, action: PayloadAction<IRFavSong>) {
      state.list.push(action.payload)
      window.localStorage.setItem(storageName, JSON.stringify(state.list))
    },
    setActiveSongFav(state, action: PayloadAction<IRFavSong>) {
      state.active = action.payload
    },
    removeSongFav(state, action: PayloadAction<IRFavSong>) {
      state.list = state.list.filter(
        song => song.reactKey !== action.payload.reactKey
      )
      window.localStorage.setItem(storageName, JSON.stringify(state.list))
    }
  }
})

export default songFavsSlice.reducer
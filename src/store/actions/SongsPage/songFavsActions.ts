import { v4 } from "uuid";
import { AppDispatch } from "../..";
import { IRFavSong, IRSong } from "../../../models";
import { songFavsSlice } from "../../slices/SongsPage/songFavsSlice";
import { setActiveSong } from "./songsActions";

export const addSongFav = (song: IRSong) => {
  return async (dispatch: AppDispatch) => {
    dispatch(songFavsSlice.actions.addSongFav({
      ...song,
      originKey: song.reactKey,
      reactKey: v4()
    }))
  }
}

export const setActivSongFav = (song: IRFavSong) => {
  return async (dispatch: AppDispatch) => {
    dispatch(songFavsSlice.actions.setActiveSongFav(song))
    dispatch(setActiveSong({
      ...song,
      reactKey: song.originKey
    }))
  }
}

export const removeSongFav = (song: IRFavSong) => {
  return async (dispatch: AppDispatch) => {
    dispatch(songFavsSlice.actions.removeSongFav(song))
  }
}
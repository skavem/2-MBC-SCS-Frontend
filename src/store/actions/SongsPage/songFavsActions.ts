import { AppDispatch } from "../..";
import { IRSong } from "../../../models";
import { songFavsSlice } from "../../slices/SongsPage/songFavsSlice";

export const setFSongFavs = (songs: IRSong[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch(songFavsSlice.actions.setSongFavs(songs))
  }
}

export const setActivSongFav = (song: IRSong) => {
  return async (dispatch: AppDispatch) => {
    dispatch(songFavsSlice.actions.setActiveSongFav(song))
  }
}

export const removeSongFav = (song: IRSong) => {
  return async (dispatch: AppDispatch) => {
    dispatch(songFavsSlice.actions.removeSongFav(song))
  }
}
import { v4 } from "uuid";
import { AppDispatch, storeReducersEnum } from "../..";
import { ISong, IRSong } from "../../../models";
import findElemInSlice from "../../../utils/findElemInSlice";
import { WSSingletone } from "../../../websocket/wsSingletone";
import { songsSlice } from "../../slices/SongsPage/songsSlice";

export const setSongs = (songs: ISong[]) => {
  return async (dispatch: AppDispatch) => {
    const rSongs: IRSong[] = songs.map(song => ({...song, reactKey: v4()}))
    dispatch(songsSlice.actions.setSongs(rSongs))
    dispatch(setActiveSong(rSongs[0]))
  }
}

export const setActiveSong = (song: IRSong) => {
  return async (dispatch: AppDispatch) => {
    dispatch(songsSlice.actions.setActiveSong(song))
    WSSingletone.get().getCouplets(song.id)
  }
}

export const setSearchedSong = (song: ISong) => {
  return async (dispatch: AppDispatch) => {
    const rSong = findElemInSlice(song, storeReducersEnum.songs)
    dispatch(songsSlice.actions.setActiveSong(rSong as IRSong))
  }
}
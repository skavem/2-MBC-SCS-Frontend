import { useAppDispatch } from "../hooks/redux";
import { IRVerse } from "../models";
import { store, storeReducersEnum } from "../store";
import { addToHistory } from "../store/actions/BiblePage/versesSHActions";
import { WSSingletone } from "../websocket/wsSingletone";

export const showVerseUtil = (verse: IRVerse, dispatch: ReturnType<typeof useAppDispatch>) => {
  WSSingletone.get().showVerse(verse)
  const book = store.getState()[storeReducersEnum.books].active!
  const chapter = store.getState()[storeReducersEnum.chapters].active!
  dispatch(addToHistory(verse, book, chapter))
}
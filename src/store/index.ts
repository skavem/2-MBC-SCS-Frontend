import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/BiblePage/booksSlice';
import chaptersReducer from './slices/BiblePage/chaptersSlice';
import recvReducer from './slices/recvSlice';
import versesSHReducer from './slices/BiblePage/versesSHSlice';
import versesReducer from './slices/BiblePage/versesSlice';
import webSocketReducer from './slices/webSocketSlice';
import settingsReducer from './slices/settingsSlice';

export interface ISOWRKSlice<T> {
  list: T[]
  active: T | null
}

export enum storeReducersEnum {
  books = 'books',
  chapters = 'chapters',
  verses = 'verses',
  versesSH = 'versesSH'
}

export const store = configureStore({
  reducer: {
    [storeReducersEnum.books]: booksReducer,
    [storeReducersEnum.chapters]: chaptersReducer,
    [storeReducersEnum.verses]: versesReducer,
    [storeReducersEnum.versesSH]: versesSHReducer,

    recv: recvReducer,
    websocket: webSocketReducer,
    settings: settingsReducer
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

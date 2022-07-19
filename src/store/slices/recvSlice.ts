import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IShownVerse, IShownCouplet} from '../../models/recvModels'

interface RecvState {
  couplet: IShownCouplet | null,
  verse: IShownVerse | null
}

const initialState: RecvState = {
  couplet: null,
  verse: null
}

export const recvSlice = createSlice({
  name: 'recv',
  initialState,
  reducers: {
    setCouplet(state, action: PayloadAction<IShownCouplet | null>) {
      state.couplet = action.payload
    },
    setVerse(state, action: PayloadAction<IShownVerse | null>) {
      state.verse = action.payload
    }
  }
})

export default recvSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ISettingsSlice {
  mark: string
  fullName: string
  insertAfter: number | null
  edit: number | null
  modalShown: boolean
}

const initialState: ISettingsSlice = {
  mark: '',
  fullName: '',
  insertAfter: -1,
  edit: null,
  modalShown: false
}

export const coupletModalSlice = createSlice({
  name: 'coupletModal',
  initialState,
  reducers: {
    setMark(state, action: PayloadAction<string>) {
      state.mark = action.payload
    },
    setFullName(state, action: PayloadAction<string>) {
      state.fullName = action.payload
    },
    setModalShown(state, action: PayloadAction<boolean>) {
      state.modalShown = action.payload
    },
    setInsertAfter(state, action: PayloadAction<number | null>) {
      state.insertAfter = action.payload
    },
    setEdit(state, action: PayloadAction<number | null>) {
      state.edit = action.payload
    },
    clear(state) {
      state.mark = ''
      state.fullName = ''
      state.insertAfter = null
      state.edit = null
      state.modalShown = false
    }
  }
})

export default coupletModalSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IError {
  text: string,
  key: string
}

interface IErrorSlice {
  list: IError[]
}

const initialState: IErrorSlice = {
  list: []
}

export const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    addError(state, action: PayloadAction<IError>) {
      state.list.unshift(action.payload)
    },
    removeError(state, action: PayloadAction<IError>) {
      state.list = state.list.filter(e => e.key !== action.payload.key)
    }
  }
})

export default errorSlice.reducer
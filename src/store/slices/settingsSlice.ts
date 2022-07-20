import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ISettingsSlice {
  wsip: string
  wsport: string
  modalShown: boolean
}

const initialState: ISettingsSlice = {
  wsip: '192.168.1.100',
  wsport: '8765',
  modalShown: false 
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setWSIP(state, action: PayloadAction<string>) {
      state.wsip = action.payload
    },
    setWSPort(state, action: PayloadAction<string>) {
      state.wsport = action.payload
    },
    setModalShown(state, action: PayloadAction<boolean>) {
      state.modalShown = action.payload
    }
  }
})

export default settingsSlice.reducer
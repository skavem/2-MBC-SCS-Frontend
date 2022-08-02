import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketState } from "../../websocket/wsWrapper";

interface IWebSocketSlice {
  state: WebSocketState
}

const initialState: IWebSocketSlice = {
  state: WebSocketState.CLOSED
}

export const webSocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    changeState(state, action: PayloadAction<WebSocketState>) {
      state.state = action.payload
    }
  }
})

export default webSocketSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketReadyState } from "../../websocket/wsWrapper";

interface IWebSocketSlice {
  state: WebSocketReadyState
}

const initialState: IWebSocketSlice = {
  state: WebSocketReadyState.CLOSED
}

export const webSocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    changeState(state, action: PayloadAction<WebSocketReadyState>) {
      state.state = action.payload
    }
  }
})

export default webSocketSlice.reducer
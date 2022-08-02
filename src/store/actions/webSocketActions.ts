import { AppDispatch } from "..";
import { WebSocketState } from "../../websocket/wsWrapper";
import { webSocketSlice } from "../slices/webSocketSlice";

export const changeWebsocketState = (to: WebSocketState) => {
  return async (dispatch: AppDispatch) => {
    dispatch(webSocketSlice.actions.changeState(to))
  }
}
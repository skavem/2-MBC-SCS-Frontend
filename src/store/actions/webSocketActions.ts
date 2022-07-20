import { AppDispatch } from "..";
import { WebSocketReadyState } from "../../websocket/wsWrapper";
import { webSocketSlice } from "../slices/webSocketSlice";

export const changeWebsocketState = (to: WebSocketReadyState) => {
  return async (dispatch: AppDispatch) => {
    dispatch(webSocketSlice.actions.changeState(to))
  }
}
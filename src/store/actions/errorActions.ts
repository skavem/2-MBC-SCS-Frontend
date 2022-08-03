import { v4 } from "uuid";
import { AppDispatch } from "..";
import { errorSlice, IError } from "../slices/errorSlice";

export const addError = (errorText: string) => {
  return async (dispatch: AppDispatch) => {
    const newError: IError = {text: errorText, key: v4()}
    dispatch(errorSlice.actions.addError(newError))
    setTimeout(() => dispatch(removeError(newError)), 4000)
  }
}

export const removeError = (error: IError) => {
  return async (dispatch: AppDispatch) => {
    dispatch(errorSlice.actions.removeError(error))
  }
}
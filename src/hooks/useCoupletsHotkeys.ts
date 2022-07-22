import { useCallback, useMemo } from "react"

import { useAppDispatch, useAppSelector } from "./redux"

import { WSSingletone } from "../websocket/wsSingletone"
import { IhotKeys, useHotkeys } from "./useHotkeys"
import { setNextCoupletActive, setPrevCoupletActive } from "../store/actions/SongsPage/coupletsActions"

export const useCoupletsHotkeys = () => {
  const dispatch = useAppDispatch()
  const couplet = useAppSelector(state => state.couplets.active)

  const showCouplet = useCallback(
    () => WSSingletone.get().showCouplet(couplet?.id!),
    [couplet]
  )

  const hideCouplet = useCallback(
    () => WSSingletone.get().hideCouplet(),
    []
  )

  const hotKeys: IhotKeys = useMemo(() => (
    {
      ArrowDown: () => dispatch(setNextCoupletActive()),
      ArrowUp: () => dispatch(setPrevCoupletActive()),
      Enter: () => showCouplet(),
      Escape: () => hideCouplet()
    }
  ), [dispatch, showCouplet, hideCouplet])

  useHotkeys(hotKeys)
}

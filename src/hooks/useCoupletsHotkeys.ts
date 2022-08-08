import { useMemo } from "react";

import { useAppDispatch, useAppSelector } from "./redux";

import {
  setNextCoupletActive,
  setPrevCoupletActive,
} from "../store/actions/SongsPage/coupletsActions";
import { IhotKeys, useHotkeys } from "./useHotkeys";
import useShowHideItems from "./useShowHideItems";
import { storeReducersEnum } from "../store";
import { WSSingletone } from "../websocket/wsSingletone";
import { ICouplet } from "../models";

export const useCoupletsHotkeys = () => {
  const isModalShown = useAppSelector(state => state.coupletModal.modalShown)
  const dispatch = useAppDispatch();
  const { showItem: showCouplet, hideItem: hideCouplet } = useShowHideItems(
    (couplet) => WSSingletone.get().showCouplet(couplet as ICouplet),
    WSSingletone.get().hideCouplet,
    storeReducersEnum.couplets
  );

  const hotKeys: IhotKeys = useMemo(
    () => ({
      ArrowDown: () => dispatch(setNextCoupletActive()),
      ArrowUp: () => dispatch(setPrevCoupletActive()),
      Enter: () => showCouplet(),
      Escape: () => hideCouplet(),
    }),
    [dispatch, showCouplet, hideCouplet]
  );

  useHotkeys(hotKeys, isModalShown);
};

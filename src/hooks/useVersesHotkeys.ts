import { useMemo } from "react";

import { useAppDispatch } from "./redux";

import {
  setNextVerseActive,
  setPrevVerseActive,
} from "../store/actions/BiblePage/versesActions";
import { WSSingletone } from "../websocket/wsSingletone";
import { IhotKeys, useHotkeys } from "./useHotkeys";
import { storeReducersEnum } from "../store";
import useShowHideItems from "./useShowHideItems";
import { showVerseUtil } from '../utils/versesFuncs'
import { IRVerse } from "../models";

export const useVersesHotkeys = () => {
  const dispatch = useAppDispatch();
  const { showItem: showVerse, hideItem: hideVerse } = useShowHideItems(
    verse => showVerseUtil(verse as IRVerse, dispatch),
    WSSingletone.get().hideVerse,
    storeReducersEnum.verses
  );

  const hotKeys: IhotKeys = useMemo(
    () => ({
      ArrowDown: () => dispatch(setNextVerseActive()),
      ArrowUp: () => dispatch(setPrevVerseActive()),
      Enter: () => showVerse(),
      Escape: () => hideVerse(),
    }),
    [dispatch, showVerse, hideVerse]
  );

  useHotkeys(hotKeys);
};

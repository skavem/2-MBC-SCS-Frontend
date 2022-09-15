import { useCallback } from "react";
import { ISObjectWRKey } from "../models";
import { storeReducersEnum } from "../store";
import { useAppSelector } from "./redux";

export const useShowHideItems = (
  showFunc: (item: ISObjectWRKey) => void,
  hideFunc: () => void,
  store: storeReducersEnum,
) => {
  const item = useAppSelector((state) => state[store].active);

  const showItem = useCallback(() => showFunc(item!), [item, showFunc]);

  const hideItem = useCallback(() => hideFunc(), [hideFunc]);

  return { showItem, hideItem };
};

export default useShowHideItems;

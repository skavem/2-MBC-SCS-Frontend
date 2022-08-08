import { useCallback, useEffect } from "react";

export interface IhotKeys {
  [index: string]: () => void;
}

export const useHotkeys = (hotKeys: IhotKeys, blocked = false) => {
  const keyHandler = useCallback(
    (e: KeyboardEvent) => {
      if (blocked) return;
      if (Object.keys(hotKeys).find((key) => key === e.key)) {
        e.preventDefault();
        hotKeys[e.key]();
      }
    },
    [hotKeys, blocked]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [keyHandler]);
};

import { useCallback, useEffect } from "react"

export interface IhotKeys {
  [index: string]: () => void
}

export const useHotkeys = (hotKeys: IhotKeys) => {
  const keyHandler = useCallback((e: KeyboardEvent) => {
    if (Object.keys(hotKeys).find(key => key === e.key)) {
      e.preventDefault()
      hotKeys[e.key]()
    }
  }, [hotKeys])

  useEffect(() => {
    document.addEventListener('keyup', keyHandler)

    return () => document.removeEventListener('keyup', keyHandler)
  }, [keyHandler])
}
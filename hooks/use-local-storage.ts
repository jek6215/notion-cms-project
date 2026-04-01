"use client"

import { useCallback, useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item !== null) setValue(JSON.parse(item) as T)
    } catch {
      // localStorage 접근 불가 시 초기값 유지
    }
  }, [key])

  const set = useCallback(
    (newValue: T) => {
      try {
        setValue(newValue)
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } catch {
        // 무시
      }
    },
    [key]
  )

  const remove = useCallback(() => {
    try {
      setValue(initialValue)
      window.localStorage.removeItem(key)
    } catch {
      // 무시
    }
  }, [key, initialValue])

  return [value, set, remove] as const
}

import { act, renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { useMediaQuery } from "@/hooks/use-media-query"

function mockMatchMedia(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = []
  const mql = {
    matches,
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) =>
      listeners.push(cb),
    removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      const idx = listeners.indexOf(cb)
      if (idx !== -1) listeners.splice(idx, 1)
    },
    dispatchChange: (newMatches: boolean) => {
      listeners.forEach((cb) =>
        cb({ matches: newMatches } as MediaQueryListEvent)
      )
    },
  }
  window.matchMedia = vi.fn().mockReturnValue(mql)
  return mql
}

describe("useMediaQuery", () => {
  it("matchMedia 결과(true)를 반영한다", () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"))
    expect(result.current).toBe(true)
  })

  it("matchMedia 결과(false)를 반영한다", () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"))
    expect(result.current).toBe(false)
  })

  it("미디어쿼리 변경 시 값이 업데이트된다", async () => {
    const mql = mockMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"))
    expect(result.current).toBe(false)

    await act(async () => mql.dispatchChange(true))
    expect(result.current).toBe(true)
  })
})

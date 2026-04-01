import { act, renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { useDebounce } from "@/hooks/use-debounce"

describe("useDebounce", () => {
  it("초기값을 즉시 반환한다", () => {
    const { result } = renderHook(() => useDebounce("초기값", 200))
    expect(result.current).toBe("초기값")
  })

  it("딜레이 전에는 이전 값을 유지한다", async () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "초기" } }
    )

    rerender({ value: "변경됨" })
    expect(result.current).toBe("초기")

    await act(async () => vi.advanceTimersByTime(300))
    expect(result.current).toBe("변경됨")
    vi.useRealTimers()
  })

  it("딜레이 기본값은 300ms다", async () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ v }) => useDebounce(v), {
      initialProps: { v: "a" },
    })

    rerender({ v: "b" })
    await act(async () => vi.advanceTimersByTime(299))
    expect(result.current).toBe("a")

    await act(async () => vi.advanceTimersByTime(1))
    expect(result.current).toBe("b")
    vi.useRealTimers()
  })
})

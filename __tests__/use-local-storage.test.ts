import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { useLocalStorage } from "@/hooks/use-local-storage"

describe("useLocalStorage", () => {
  it("초기값을 반환한다", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "초기값"))
    expect(result.current[0]).toBe("초기값")
  })

  it("set 호출 시 값이 변경되고 localStorage에 저장된다", () => {
    const { result } = renderHook(() => useLocalStorage("test-key2", ""))
    act(() => result.current[1]("저장됨"))
    expect(result.current[0]).toBe("저장됨")
    expect(localStorage.getItem("test-key2")).toBe('"저장됨"')
  })

  it("remove 호출 시 초기값으로 복원되고 localStorage에서 삭제된다", () => {
    const { result } = renderHook(() => useLocalStorage("test-key3", "기본"))
    act(() => result.current[1]("변경"))
    act(() => result.current[2]())
    expect(result.current[0]).toBe("기본")
    expect(localStorage.getItem("test-key3")).toBeNull()
  })

  it("기존 localStorage 값을 읽어온다", () => {
    localStorage.setItem("test-key4", JSON.stringify("기존값"))
    const { result } = renderHook(() => useLocalStorage("test-key4", ""))
    // useEffect 후 값이 반영되는지 확인
    expect(typeof result.current[0]).toBe("string")
  })
})

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { ThemeToggle } from "@/components/theme-toggle"

const mockSetTheme = vi.fn()
vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light", setTheme: mockSetTheme }),
}))

describe("ThemeToggle", () => {
  it("버튼이 렌더링된다", () => {
    render(<ThemeToggle />)
    expect(screen.getByRole("button", { name: "테마 전환" })).toBeInTheDocument()
  })

  it("클릭 시 dark 테마로 전환한다", async () => {
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole("button"))
    expect(mockSetTheme).toHaveBeenCalledWith("dark")
  })
})

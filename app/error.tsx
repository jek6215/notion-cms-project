"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <p className="text-6xl font-bold text-muted-foreground">오류</p>
      <h1 className="text-2xl font-semibold">예상치 못한 문제가 발생했습니다</h1>
      <p className="max-w-sm text-muted-foreground">
        잠시 후 다시 시도하거나 페이지를 새로고침 해주세요.
      </p>
      <Button onClick={unstable_retry}>다시 시도</Button>
    </div>
  )
}

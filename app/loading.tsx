import { Skeleton } from "@/components/ui/skeleton"

// 공지사항 목록 로딩 스켈레톤
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Skeleton className="mb-2 h-8 w-32" />
      <Skeleton className="mb-8 h-4 w-64" />

      {/* 카테고리 탭 스켈레톤 */}
      <div className="mb-6 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-md" />
        ))}
      </div>

      {/* 공지 카드 스켈레톤 */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-5">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="mb-1 h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

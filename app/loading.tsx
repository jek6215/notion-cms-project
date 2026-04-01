import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* Hero 스켈레톤 */}
      <section className="flex flex-col items-center gap-6">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-12 w-80" />
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-6 w-96" />
        <div className="flex gap-3">
          <Skeleton className="h-11 w-36" />
          <Skeleton className="h-11 w-28" />
        </div>
      </section>

      {/* 기술 스택 스켈레톤 */}
      <section className="mt-20">
        <Skeleton className="mx-auto mb-6 h-8 w-32" />
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-full" />
          ))}
        </div>
      </section>

      {/* 기능 카드 스켈레톤 */}
      <section className="mt-20">
        <Skeleton className="mx-auto mb-8 h-8 w-24" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-6">
              <Skeleton className="mb-2 h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

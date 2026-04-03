// 공지사항 목록 페이지 (메인)
// TODO: Notion API 연동 후 실제 데이터로 교체

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-2xl font-bold tracking-tight">공지사항</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        팀 공지 및 업데이트를 확인하세요.
      </p>

      {/* TODO: 카테고리 탭 필터 (F003) */}
      {/* TODO: 중요 공지 고정 영역 (F002) */}
      {/* TODO: 공지 목록 (F001) */}

      <p className="text-sm text-muted-foreground">공지사항을 불러오는 중...</p>
    </div>
  )
}

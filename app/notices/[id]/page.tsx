// 공지사항 상세 페이지 (F004)
// TODO: Notion API 연동 후 실제 데이터로 교체

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function NoticeDetailPage({ params }: PageProps) {
  const { id } = await params

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* TODO: 공지 상세 렌더링 (제목, 게시일, 카테고리, 본문 블록) */}
      <p className="text-sm text-muted-foreground">
        공지사항을 불러오는 중... (id: {id})
      </p>
    </div>
  )
}

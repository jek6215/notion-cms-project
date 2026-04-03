# Notion 공지사항 보드 MVP 개발 로드맵

Notion을 CMS로 활용한 팀/스터디/사내 공지 게시판 MVP

## 개요

비개발자도 Notion에서 직접 공지를 작성하고, 팀원은 웹 게시판에서 편리하게 열람할 수 있는 공지사항 보드를 구축한다.

- **공지 목록 조회 (F001)**: Notion DB에서 공개 공지를 게시일 내림차순으로 목록 표시
- **중요 공지 상단 고정 (F002)**: 중요 공지를 항상 상단에 배치하고 배지로 시각 구분
- **카테고리 필터 (F003)**: Notion DB Select 필드 값으로 동적 생성된 탭 기반 필터링
- **공지 상세 조회 (F004)**: 제목, 게시일, 카테고리, Notion 블록 본문 렌더링
- **Notion API 연동 (F010)**: 서버 컴포넌트 전용 API 호출, API 키 노출 방지

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `RoadMap.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 각 단계 완료 후 중단하고 추가 지시를 기다림
   - **구현 완료 후 반드시 Playwright MCP로 테스트 수행**
   - API/비즈니스 로직 작업: Playwright MCP로 실제 동작 검증 필수
   - UI 컴포넌트 작업: Playwright MCP로 브라우저 렌더링 검증 필수

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 `[x]`로 표시

---

## 개발 단계

### Phase 1: 프로젝트 초기 설정 -- 완료

> **이유**: 모든 개발의 전제 조건. 골격 없이는 아무것도 구현 불가.
> **예상 소요**: 이미 완료
> **완료 기준**: `npm run dev` / `npm run build` / `npm run test` 모두 성공

- [x] **1단계: 프로젝트 구조 및 기본 설정**
  - [x] Next.js 16 + TypeScript + TailwindCSS v4 프로젝트 초기화
  - [x] shadcn/ui 컴포넌트 35개 설치 및 설정 (`components/ui/`)
  - [x] ESLint, Vitest 설정 (`eslint.config.mjs`, `vitest.config.ts`)
  - [x] `@notionhq/client` v5.16.0 설치
  - [x] `.env.local.example` 생성 (NOTION_API_KEY, NOTION_DATABASE_ID)

- [x] **2단계: 레이아웃 및 공통 UI 구현**
  - [x] Root Layout (`app/layout.tsx`) - ThemeProvider, Header, Footer, Toaster
  - [x] Header (`components/layout/header.tsx`) - Sticky nav, 모바일 Sheet 메뉴
  - [x] Footer (`components/layout/footer.tsx`) - 링크 및 기술스택
  - [x] ThemeProvider + ThemeToggle 다크모드 지원
  - [x] 에러/로딩/404 페이지 (`app/error.tsx`, `app/loading.tsx`, `app/not-found.tsx`)

- [x] **3단계: 커스텀 훅 구현 및 테스트**
  - [x] `hooks/use-debounce.ts` - 입력 디바운싱
  - [x] `hooks/use-local-storage.ts` - localStorage 동기화 (SSR-safe)
  - [x] `hooks/use-media-query.ts` - 반응형 breakpoint 감지 (SSR-safe)
  - [x] 각 훅 단위 테스트 작성 및 통과 확인

- [x] **4단계: 페이지 플레이스홀더 생성**
  - [x] `app/page.tsx` - 공지사항 목록 페이지 플레이스홀더
  - [x] `app/notices/[id]/page.tsx` - 공지사항 상세 페이지 플레이스홀더
  - [x] Next.js 16 `params` Promise 타입 적용 확인

---

### Phase 2: 공통 모듈/컴포넌트 개발

> **이유**: 핵심 기능(Phase 3)이 공유하는 레이어를 먼저 구축해야 중복 코드를 방지하고 재사용성을 확보할 수 있다. 타입 정의, API 클라이언트, UI 컴포넌트가 준비되어야 페이지 조립이 가능하다.
> **예상 소요**: 2일
> **완료 기준**: 각 컴포넌트 독립 렌더링 확인 + 단위 테스트 통과 + Playwright MCP로 UI 컴포넌트 브라우저 렌더링 검증 통과

- [ ] **5단계: TypeScript 타입 정의** - 우선순위
  - `types/notice.ts` 생성
  - Notice 인터페이스 (id, title, summary, category, isPinned, publishedAt, isPublic)
  - NoticeBlock 타입 (paragraph, heading_1/2/3, bulleted_list_item, numbered_list_item, code, image, quote, callout, divider)
  - RichText 타입 (text, annotations: bold/italic/strikethrough/code/link/color)
  - Notion API 응답을 도메인 타입으로 변환하는 매퍼 함수 시그니처 정의

- [ ] **6단계: Notion API 클라이언트 래퍼**
  - `lib/notion.ts` 생성
  - Notion Client 초기화 (환경 변수 검증 포함)
  - `getNotices(category?: string)`: 공개여부=true 필터, 게시일 내림차순 정렬, Notion 응답을 Notice[] 타입으로 변환
  - `getNotice(id: string)`: 단일 공지 조회, 공개여부=false면 null 반환
  - `getBlocks(pageId: string)`: 페이지 블록 목록 조회, NoticeBlock[] 타입으로 변환
  - 에러 핸들링: API 호출 실패 시 적절한 에러 throw
  - 단위 테스트 작성 (Notion Client mock)
  - Playwright MCP로 실제 API 연동 동작 검증 (목록/단건 조회 정상 응답 확인)

- [ ] **7단계: 공지 카드 컴포넌트**
  - `components/notice/notice-card.tsx` 생성
  - 제목, 요약, 게시일 (Calendar 아이콘 + 포맷팅), 카테고리 Badge 표시
  - 중요 공지: Pin 아이콘 + "중요" Badge 추가 표시
  - 카드 클릭 시 `/notices/[id]` 이동 (Next.js Link)
  - 반응형 레이아웃 (모바일/데스크톱)
  - 단위 테스트 작성
  - Playwright MCP로 브라우저 렌더링 검증 (카드 표시, 링크 이동 확인)

- [ ] **8단계: 카테고리 탭 컴포넌트**
  - `components/notice/category-tabs.tsx` 생성 (Client Component)
  - "전체" 탭 + Notion DB에서 가져온 카테고리 값으로 동적 탭 생성
  - shadcn/ui Tabs 컴포넌트 활용
  - URL 쿼리 파라미터(`?category=xxx`) 기반 상태 관리 (useSearchParams)
  - 탭 선택 시 URL 업데이트 (shallow navigation)
  - 단위 테스트 작성
  - Playwright MCP로 브라우저 렌더링 검증 (탭 클릭, URL 파라미터 변경 확인)

- [ ] **9단계: 블록 렌더러 컴포넌트**
  - `components/notice/block-renderer.tsx` 생성
  - 9가지 블록 타입별 렌더링: paragraph, heading_1/2/3, bulleted_list_item, numbered_list_item, code, image, quote, callout, divider
  - Rich Text 렌더링: bold, italic, strikethrough, inline code, link, color 지원
  - 연속된 list_item 블록을 `<ul>` / `<ol>`로 그룹핑
  - 미지원 블록 fallback: "이 콘텐츠는 Notion에서 확인해주세요" 메시지
  - 단위 테스트 작성 (각 블록 타입별 렌더링 검증)
  - Playwright MCP로 브라우저 렌더링 검증 (각 블록 타입 실제 표시 확인)

---

### Phase 3: 핵심 기능 개발 (F001-F004, F010)

> **이유**: Phase 2의 공통 모듈을 조합해 서비스의 핵심 가치를 제공한다. 타입, API 클라이언트, UI 컴포넌트가 준비된 상태에서 페이지를 조립하므로 효율적이다.
> **예상 소요**: 3일
> **완료 기준**: 실제 Notion DB 연결 후 목록/상세 페이지 정상 동작 확인, Playwright E2E 테스트 통과

- [ ] **10단계: 목록 페이지 완성 (F001, F002, F003)** - 우선순위
  - `app/page.tsx` 재구현 (Server Component)
  - `getNotices()` 호출로 공지 목록 fetch (F001, F010)
  - 중요 공지 상단 고정 정렬 로직 구현 (F002)
  - CategoryTabs 컴포넌트 연동 (F003) - searchParams에서 카테고리 읽기
  - NoticeCard 컴포넌트로 목록 렌더링
  - ISR 캐싱: `export const revalidate = 60`
  - 공지가 없을 때 빈 상태 UI ("등록된 공지사항이 없습니다")
  - Skeleton 로딩 UI (Suspense boundary)
  - Playwright MCP로 E2E 검증: 공지 목록 렌더링, 중요 공지 상단 고정, 카테고리 필터 동작 확인

- [ ] **11단계: 상세 페이지 완성 (F004, F010)**
  - `app/notices/[id]/page.tsx` 재구현 (Server Component)
  - `getNotice(id)` + `getBlocks(id)` 호출 (F004, F010)
  - 공개여부=false 또는 존재하지 않는 공지 시 `notFound()` 호출
  - 제목, 게시일, 카테고리 Badge, 중요 Badge 헤더 영역
  - BlockRenderer 컴포넌트로 본문 렌더링
  - "목록으로 돌아가기" 버튼 (ArrowLeft 아이콘 + Link)
  - ISR 캐싱: `export const revalidate = 60`
  - `generateMetadata()` 구현 (페이지 제목 동적 설정)
  - Playwright MCP로 E2E 검증: 블록 렌더링, 목록 복귀 버튼 동작, 잘못된 ID 404 처리 확인

- [ ] **12단계: 통합 테스트**
  - Playwright MCP를 사용한 E2E 테스트 시나리오 작성 및 실행
  - 목록 페이지: 공지 목록 렌더링, 중요 공지 상단 고정, 카테고리 필터링
  - 상세 페이지: 블록 렌더링, 메타데이터, 목록 복귀 동작
  - 존재하지 않는 ID 접근 시 404 페이지 표시
  - API 오류 시 에러 UI 표시

---

### Phase 4: 에러 핸들링 및 UX 개선

> **이유**: 핵심 기능이 완성된 후 안정성과 사용성을 강화한다. 핵심 기능 없이 에러 처리나 UX 개선은 의미가 없다.
> **예상 소요**: 1일
> **완료 기준**: 에러 케이스 수동 테스트 통과, 모바일 레이아웃 정상 동작, 접근성 기본 요건 충족, Playwright MCP로 에러 케이스 E2E 테스트 통과

- [ ] **13단계: 에러 핸들링 강화**
  - Notion API 호출 실패 시 "공지사항을 불러올 수 없습니다" + 새로고침 버튼 UI
  - 목록 페이지 에러 바운더리 (`app/error.tsx` 활용)
  - 상세 페이지 에러 바운더리 (`app/notices/[id]/error.tsx` 생성)
  - 공개여부=false 공지 직접 접근 시 notFound() 처리 검증
  - 미지원 블록 fallback 메시지 동작 확인

- [ ] **14단계: 반응형 및 접근성 점검**
  - 모바일 (< 768px) / 태블릿 (768px-1024px) / 데스크톱 (> 1024px) 레이아웃 검증
  - 공지 카드 그리드/리스트 반응형 전환
  - 카테고리 탭 모바일 스크롤 처리
  - aria-label 적용 (카드, 탭, 버튼 등)
  - 키보드 내비게이션 (Tab, Enter로 공지 탐색 및 진입)
  - 색상 대비 (다크모드 포함) 확인

---

### Phase 5: 최적화 및 배포

> **이유**: 기능이 완성되고 안정화된 후 성능/품질을 마무리하고 프로덕션에 배포한다. 기능 미완성 상태에서 배포는 의미가 없다.
> **예상 소요**: 1일
> **완료 기준**: Vercel 배포 성공, 프로덕션 URL에서 전체 기능 동작 확인, Lighthouse Performance 80+, Playwright MCP로 프로덕션 전체 기능 E2E 검증 통과

- [ ] **15단계: 빌드 검증 및 성능 최적화**
  - `npm run build` 오류 없음 확인
  - TypeScript strict 모드 경고 해소
  - 이미지 최적화 (next/image 활용 검토)
  - Lighthouse 성능 점수 확인 (목표: Performance 80+)
  - 번들 사이즈 점검

- [ ] **16단계: Vercel 배포**
  - Vercel 프로젝트 생성 및 GitHub 연결
  - Vercel 환경 변수 설정 (NOTION_API_KEY, NOTION_DATABASE_ID)
  - 프로덕션 배포 실행
  - 프로덕션 URL에서 전체 기능 동작 확인
  - README.md 업데이트 (배포 URL, 환경 변수 설정 방법, 로컬 개발 가이드)

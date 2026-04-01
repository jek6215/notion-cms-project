# Next.js 스타터킷 종합 구현 계획

## 현재 상태

| 항목 | 값 |
|---|---|
| Next.js | 16.2.1 (App Router) |
| React | 19.2.4 |
| TailwindCSS | 4 |
| ShadcnUI | radix-nova style |
| 설치됨 | radix-ui 1.4.3, cva, clsx, tailwind-merge, tw-animate-css |
| 기존 컴포넌트 | `button.tsx`, `lib/utils.ts` |

**Next.js 16 주의사항**
- `params`, `searchParams` → `Promise` 타입 (반드시 `await`)
- `PageProps<'/path'>`, `LayoutProps<'/path'>` 글로벌 헬퍼 (import 불필요)

---

## 추가 설치 라이브러리

| 라이브러리 | 용도 | 이유 |
|---|---|---|
| `next-themes` | 다크모드 | Next.js 표준, SSR 안전 |
| `react-hook-form` | 폼 상태 관리 | 업계 표준, 성능 최적 |
| `@hookform/resolvers` | zod 연동 | react-hook-form 공식 |
| `zod` | 스키마 유효성 검사 | TypeScript 친화적 |
| `sonner` | Toast 알림 | shadcn 공식 권장 |

```bash
npm install next-themes react-hook-form @hookform/resolvers zod sonner
```

---

## ShadcnUI 컴포넌트 설치 계획

### Priority 1 — 기본 UI (모든 웹에서 필요)

```bash
npx shadcn add badge card input label separator skeleton
```

| 컴포넌트 | 용도 |
|---|---|
| `badge` | 상태 태그, 카테고리 라벨 |
| `card` | 콘텐츠 블록, 대시보드 위젯 |
| `input` | 모든 텍스트 입력 |
| `label` | input과 쌍으로 사용 |
| `separator` | 시각적 구분선 |
| `skeleton` | 로딩 플레이스홀더 |

### Priority 2 — 인터랙션 (대부분의 웹에서 필요)

```bash
npx shadcn add dialog sheet dropdown-menu tabs avatar tooltip alert sonner
```

| 컴포넌트 | 용도 |
|---|---|
| `dialog` | 확인/폼 모달 |
| `sheet` | 모바일 사이드 메뉴, 슬라이드 패널 |
| `dropdown-menu` | 유저 메뉴, 컨텍스트 메뉴 |
| `tabs` | 콘텐츠 탭 전환 |
| `avatar` | 유저 프로필 이미지 |
| `tooltip` | 힌트 텍스트 |
| `alert` | 경고/안내 메시지 |
| `sonner` | Toast 알림 (sonner 패키지 연동) |

### Priority 3 — 폼 & 데이터 (필요 시 추가)

```bash
npx shadcn add form select checkbox radio-group switch textarea table progress breadcrumb pagination
```

| 컴포넌트 | 용도 |
|---|---|
| `form` | react-hook-form + zod 연동 |
| `select` | 드롭다운 선택 |
| `checkbox` | 다중 선택 |
| `radio-group` | 단일 선택 |
| `switch` | 토글 설정 |
| `textarea` | 긴 텍스트 입력 |
| `table` | 데이터 테이블 |
| `progress` | 진행률 표시 |
| `breadcrumb` | 경로 네비게이션 |
| `pagination` | 페이지 이동 |

---

## 컴포넌트 계층 구조

```
app/
  layout.tsx                # ThemeProvider + Header + main + Footer + Toaster
  page.tsx                  # 랜딩 페이지 (Hero / Tech Stack / Features / CTA)
  loading.tsx               # Skeleton 기반 로딩 UI
  not-found.tsx             # 404 페이지
  error.tsx                 # "use client" 에러 바운더리

components/
  providers/
    theme-provider.tsx      # next-themes ThemeProvider 래퍼
  layout/
    header.tsx              # sticky nav + 모바일 Sheet 메뉴
    footer.tsx              # 링크 + 기술스택 텍스트
  theme-toggle.tsx          # next-themes useTheme() 사용
  ui/                       # ShadcnUI 자동 생성 (수동 편집 금지)
    button.tsx              # 기존 유지
    badge.tsx
    card.tsx
    input.tsx
    label.tsx
    separator.tsx
    skeleton.tsx
    dialog.tsx
    sheet.tsx
    dropdown-menu.tsx
    tabs.tsx
    avatar.tsx
    tooltip.tsx
    alert.tsx
    sonner.tsx
    form.tsx
    select.tsx
    checkbox.tsx
    radio-group.tsx
    switch.tsx
    textarea.tsx
    table.tsx
    progress.tsx
    breadcrumb.tsx
    pagination.tsx

hooks/
  use-media-query.ts        # window.matchMedia 래핑, SSR 안전
  use-debounce.ts           # 입력 지연 처리 (검색 최적화)
  use-local-storage.ts      # localStorage 상태 동기화
```

---

## 구현 순서

### Step 1 — 라이브러리 설치
```bash
npm install next-themes react-hook-form @hookform/resolvers zod sonner
```

### Step 2 — ShadcnUI Priority 1 설치
```bash
npx shadcn add badge card input label separator skeleton
```

### Step 3 — ShadcnUI Priority 2 설치
```bash
npx shadcn add dialog sheet dropdown-menu tabs avatar tooltip alert sonner
```

### Step 4 — ShadcnUI Priority 3 설치
```bash
npx shadcn add form select checkbox radio-group switch textarea table progress breadcrumb pagination
```

### Step 5 — 커스텀 훅 구현
- `hooks/use-media-query.ts` — `window.matchMedia`, SSR 초기값 `false`
- `hooks/use-debounce.ts` — `useState` + `useEffect` + delay
- `hooks/use-local-storage.ts` — get/set/remove, SSR 안전

### Step 6 — ThemeProvider 래퍼
- `components/providers/theme-provider.tsx` — `next-themes` `ThemeProvider` 래핑
- `components/theme-toggle.tsx` — `useTheme()` 기반 Sun/Moon 토글 버튼

### Step 7 — 레이아웃 컴포넌트
- `components/layout/header.tsx`
  - `"use client"` (모바일 메뉴 state)
  - sticky + backdrop-blur
  - 데스크톱: 로고 | nav | ThemeToggle + CTA
  - 모바일: 햄버거 → `Sheet` 슬라이드 메뉴
- `components/layout/footer.tsx`
  - Server Component
  - 로고 | 기술스택 텍스트 | 링크 nav

### Step 8 — 루트 레이아웃 수정
- `app/layout.tsx`
  - `ThemeProvider` 래핑 (`attribute="class"`, `defaultTheme="system"`)
  - `lang="ko"`, Header, Footer, Toaster 삽입
  - metadata 업데이트

### Step 9 — 앱 페이지
- `app/page.tsx` — 랜딩: Hero / Tech Stack (Badge) / Features (Card) / CTA
- `app/loading.tsx` — Skeleton 기반
- `app/not-found.tsx` — 404 안내 + 홈 버튼
- `app/error.tsx` — `"use client"`, reset 버튼 포함

---

## 의존성 그래프

```
app/layout.tsx
  ├── components/providers/theme-provider.tsx  (next-themes)
  ├── components/layout/header.tsx
  │     ├── components/ui/button.tsx
  │     ├── components/ui/sheet.tsx
  │     └── components/theme-toggle.tsx
  │           └── components/ui/button.tsx
  ├── components/layout/footer.tsx
  └── components/ui/sonner.tsx                 (Toaster)

app/page.tsx
  ├── components/ui/button.tsx
  ├── components/ui/badge.tsx
  └── components/ui/card.tsx
```

---

## 미포함 범위

- **인증(Auth)** — 프로젝트별 요구사항 상이
- **API Routes** — 별도 확장 영역
- **@tanstack/react-query** — 필요 시 추가 (데이터 fetching 레이어)
- **i18n** — 별도 설정 필요

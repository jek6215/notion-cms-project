# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js 16 주의사항

이 프로젝트는 **Next.js 16**을 사용하며, breaking changes가 있습니다. 코드 작성 전에 다음을 숙지하세요:
- `params`, `searchParams` → 반드시 `Promise` 타입, `await` 필수
- API 문서: `node_modules/next/dist/docs/` 참고
- 공식 마이그레이션 가이드 참조 필수

## 빠른 시작

```bash
npm run dev        # 개발 서버 (http://localhost:3000)
npm run build      # 프로덕션 빌드
npm start          # 프로덕션 서버 시작
npm run lint       # ESLint 검사 (파일 자동 수정: --fix)
npm run test       # 전체 테스트 (단일 실행)
npm run test:watch # 감시 모드 테스트 (파일 변경 시 자동 재실행)
```

### 테스트 명령어 상세

```bash
# 특정 테스트 파일만 실행
npm run test -- use-debounce.test.ts

# Watch 모드에서 특정 패턴만 재실행
npm run test:watch -- use-

# 변경된 파일만 테스트 (watch 모드)
npm run test:watch -- --changed
```

## 아키텍처 개요

### 스택
- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.4 (Server/Client Components)
- **UI**: ShadcnUI (Radix UI + TailwindCSS 4)
- **테스트**: Vitest + Testing Library
- **폼**: React Hook Form + Zod 검증
- **알림**: Sonner (Toast)
- **테마**: next-themes (다크모드 + SSR 안전)

### 디렉토리 구조
```
app/                      # Next.js 앱 라우터 (Server Components)
  layout.tsx              # Root layout: ThemeProvider, Header, Footer, Toaster
  page.tsx                # 랜딩 페이지
  error.tsx               # Client error boundary
  loading.tsx             # Skeleton 기반 로딩 UI
  not-found.tsx           # 404 페이지

components/
  providers/              # 컨텍스트 프로바이더
    theme-provider.tsx    # next-themes wrapper
  layout/                 # 레이아웃 컴포넌트
    header.tsx            # Sticky nav: 로고 + 메뉴 (모바일 Sheet)
    footer.tsx            # 푸터: 링크 + 기술스택
  ui/                     # ShadcnUI 컴포넌트 (자동 생성됨)
    button.tsx
    card.tsx
    badge.tsx
    form.tsx
    [기타 34개 컴포넌트]

hooks/                    # 커스텀 훅
  use-media-query.ts      # window.matchMedia (SSR-safe)
  use-debounce.ts         # 입력 디바운싱 (검색 최적화)
  use-local-storage.ts    # localStorage 동기화

lib/
  utils.ts                # cn() — clsx + tailwind-merge 유틸

__tests__/                # Vitest 테스트 파일
  *.test.ts              # .test.ts / .test.tsx 확장자
```

### Key Design Patterns

**Next.js 16 주의사항**
- `params`, `searchParams` → `Promise` 타입 필수 (`await` 처리)
- `PageProps<'/path'>`, `LayoutProps<'/path'>` 글로벌 헬퍼 자동 제공

**컴포넌트 계층**
- **Server Components** (기본): `app/`, `components/layout/`, `components/providers/`
- **Client Components** (`"use client"`): `Header` (모바일 메뉴 상태), `ThemeToggle`, 폼 컴포넌트

**스타일링**
- Tailwind CSS 4 + `lib/utils.ts`의 `cn()` 유틸
- shadcn 컴포넌트: `components.json`으로 자동 생성

**테마 (다크모드)**
- `next-themes` → Root layout의 `ThemeProvider`
- `useTheme()` 훅: `theme`, `setTheme`, `systemTheme` 제공
- `components/theme-toggle.tsx` 참고

### 테스트 전략

**Vitest 설정** (`vitest.config.ts`)
- jsdom 환경 (DOM 테스트)
- Testing Library 통합
- `vitest.setup.ts` → `@testing-library/jest-dom` 확장 메서드

**테스트 작성 예**
```typescript
// __tests__/component.test.tsx
import { render, screen } from "@testing-library/react"
import { Button } from "@/components/ui/button"

it("renders button", () => {
  render(<Button>Click</Button>)
  expect(screen.getByText("Click")).toBeInTheDocument()
})
```

## ShadcnUI 컴포넌트

스타터킷에 포함된 컴포넌트 (총 35개):
- **Layout**: Sheet, Dialog, DropdownMenu, Breadcrumb, Pagination
- **Form**: Form, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Label
- **Display**: Button, Badge, Card, Avatar, Alert, Tooltip, Skeleton, Table, Progress, Tabs

**새 컴포넌트 추가**
```bash
npx shadcn add component-name
```

컴포넌트 설정은 `components.json`에 저장됨 (경로, 별칭 등).

## 폼 처리

**React Hook Form + Zod 패턴**
```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem } from "@/components/ui/form"

const schema = z.object({
  email: z.string().email(),
})

export function LoginForm() {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { email: "" } })
  
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <Input {...field} />
          </FormItem>
        )}
      />
    </Form>
  )
}
```

## 주의사항

1. **ShadcnUI 컴포넌트는 `components/ui/`에서 자동 생성됨** — 수동 편집하면 업데이트 시 손실됨
2. **테마 적용**: Root layout에 `ThemeProvider` 필수 (이미 구성됨)
3. **모바일 반응형**: `use-media-query` 훅 활용 (`md` breakpoint = 768px)
4. **localStorage 접근**: 반드시 `use-local-storage` 훅 사용 (SSR 안전)
5. **Toast 알림**: `Toaster`는 Root layout에 이미 포함됨 → `sonner`의 `toast()` 사용

## 구현 상태

✅ **완료**: Step 1-9 모두 완료
- 라이브러리 설치 완료
- ShadcnUI 컴포넌트 35개 설치 완료
- 커스텀 훅 (useMediaQuery, useDebounce, useLocalStorage) 구현 완료
- ThemeProvider, Header, Footer 구현 완료
- 루트 레이아웃, 랜딩 페이지 완료
- 로딩/에러/404 페이지 완료
- 테스트 설정 완료

더 자세한 구현 계획은 `plan.md` 참고.

## 관련 파일

- `components.json` — shadcn 설정 (자동 생성 경로 등)
- `eslint.config.mjs` — ESLint: Next.js core-web-vitals + TypeScript (자동 수정: `npm run lint -- --fix`)
- `tsconfig.json` — TypeScript 설정 (`@/` 패스 별칭 포함, `strict: true`)
- `tailwind.config.ts` — Tailwind 설정 (shadcn 테마 변수 포함)
- `vitest.config.ts` — Vitest 설정 (jsdom, globals, setupFiles)
- `next.config.ts` — Next.js 설정 (현재 기본값)

## API 라우트 및 확장

API 라우트를 추가하려면:
```bash
# app/api/hello/route.ts 생성 → POST /api/hello로 접근 가능
```

**주의**: Next.js 16에서 `params`, `searchParams`는 Promise 타입입니다.
```typescript
export async function GET(
  request: Request,
  { params, searchParams }: { 
    params: Promise<Record<string, string | string[]>>
    searchParams: Promise<Record<string, string | string[]>>
  }
) {
  const p = await params
  const s = await searchParams
  // ...
}
```

## 환경 변수

`.env.local` 파일이 필요한 경우 프로젝트 루트에 생성:
```bash
# 예시 (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

- `NEXT_PUBLIC_*`: 클라이언트에서 접근 가능 (번들에 포함)
- 나머지: 서버측만 접근 가능

## 트러블슈팅

### 테스트 import 경로 오류
`@/components/...` 경로가 작동하려면 `vitest.config.ts`의 alias 설정 필수.
현재 설정됨: `"@": path.resolve(__dirname, ".")`

### 모바일 메뉴가 작동하지 않음
`Header` 컴포넌트에 `"use client"` 지시문 확인. `useState`는 클라이언트 전용.

### 다크 모드 깜빡임
Root layout의 `suppressHydrationWarning` 확인 (`app/layout.tsx`에 설정됨).

### ShadcnUI 컴포넌트 업데이트
```bash
npx shadcn add [component-name] --overwrite
```
`components/ui/` 내 파일은 수동 편집하면 업데이트 시 손실됨.

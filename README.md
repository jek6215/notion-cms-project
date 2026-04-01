# Notion 공지사항 보드

Notion을 CMS로 활용한 팀/스터디/사내 공지 게시 웹페이지.
비개발자도 Notion에서 직접 공지를 작성하면 웹에 자동 반영됩니다.

## 주요 기능

- 공지사항 목록 조회 (공개 여부 필터링)
- 카테고리별 필터링 (Notion Select 값 동적 생성)
- 중요 공지 상단 고정
- 공지 상세 페이지 (Notion 페이지 블록 렌더링)

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| CMS | Notion API (`@notionhq/client`) |
| Styling | Tailwind CSS v4, shadcn/ui |
| Icons | Lucide React |
| Deploy | Vercel |

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 값을 입력하세요:

```bash
NOTION_API_KEY=secret_...
NOTION_DATABASE_ID=...
```

- `NOTION_API_KEY`: [Notion Integrations](https://www.notion.so/my-integrations)에서 발급
- `NOTION_DATABASE_ID`: 공지사항 Notion 데이터베이스 URL에서 추출

### 3. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인

## Notion 데이터베이스 구조

| 필드 | 타입 | 설명 |
|------|------|------|
| 제목 | Title | 공지 제목 |
| 요약 | Rich Text | 목록 카드용 짧은 설명 |
| 카테고리 | Select | 일반 / 업데이트 / 이벤트 등 |
| 중요여부 | Checkbox | 상단 고정 여부 |
| 게시일 | Date | 공지 날짜 |
| 공개여부 | Checkbox | 웹 노출 여부 |

## 명령어

```bash
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드
npm run lint       # ESLint 검사
npm run test       # 테스트 실행
```

## 문서

- [PRD](docs/PRD.md) - 제품 요구사항 문서

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const techStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS 4",
  "shadcn/ui",
  "next-themes",
  "react-hook-form",
  "zod",
  "sonner",
]

const features = [
  {
    title: "다크 모드",
    description: "next-themes 기반 시스템/라이트/다크 테마 전환을 지원합니다.",
  },
  {
    title: "폼 유효성 검사",
    description:
      "react-hook-form + zod 조합으로 타입 안전한 폼 처리를 제공합니다.",
  },
  {
    title: "Toast 알림",
    description: "sonner 기반 Toast 컴포넌트로 UX 피드백을 손쉽게 제공합니다.",
  },
  {
    title: "반응형 레이아웃",
    description:
      "모바일 Sheet 메뉴와 데스크톱 nav를 포함한 반응형 헤더를 제공합니다.",
  },
  {
    title: "커스텀 훅",
    description:
      "useMediaQuery, useDebounce, useLocalStorage 훅이 기본 포함됩니다.",
  },
  {
    title: "UI 컴포넌트",
    description:
      "shadcn/ui의 20+ 컴포넌트가 사전 설치되어 즉시 사용 가능합니다.",
  },
]

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary">Next.js 16 App Router</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          프로젝트를 빠르게
          <br />
          시작하세요
        </h1>
        <p className="max-w-lg text-lg text-muted-foreground">
          Next.js + shadcn/ui + TypeScript 기반의 스타터킷. 다크 모드, 폼
          처리, Toast 알림이 모두 포함되어 있습니다.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="#features">기능 살펴보기</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </Button>
        </div>
      </section>

      {/* 기술 스택 */}
      <section id="tech" className="mt-20">
        <h2 className="mb-6 text-center text-2xl font-semibold">기술 스택</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* 기능 */}
      <section id="features" className="mt-20">
        <h2 className="mb-8 text-center text-2xl font-semibold">주요 기능</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description }) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mt-20 flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold">지금 바로 시작하세요</h2>
        <p className="text-muted-foreground">
          이 스타터킷을 클론하고 바로 개발을 시작할 수 있습니다.
        </p>
        <Button asChild size="lg">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            레포지토리 보기
          </Link>
        </Button>
      </section>
    </div>
  )
}

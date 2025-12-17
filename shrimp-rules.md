# Development Guidelines

> AI Agent 전용 개발 표준 문서

---

## 프로젝트 개요

| 항목 | 값 |
|------|-----|
| **프레임워크** | Next.js 16 (App Router) |
| **React** | 19 |
| **스타일링** | Tailwind CSS 4 + tw-animate-css |
| **UI 라이브러리** | shadcn/ui (new-york 스타일) |
| **아이콘** | lucide-react |
| **언어** | TypeScript |

---

## 언어 및 커뮤니케이션 규칙

### 필수 준수 사항

| 항목 | 언어 | 예시 |
|------|------|------|
| **응답** | 한국어 | "파일을 수정했습니다" |
| **코드 주석** | 한국어 | `// 사용자 인증 처리` |
| **커밋 메시지** | 한국어 | `feat: 로그인 기능 추가` |
| **문서화** | 한국어 | README, 주석 문서 |
| **변수/함수명** | 영어 | `userName`, `handleSubmit` |

### 올바른 예시

```typescript
// 사용자 데이터를 가져오는 함수
async function fetchUserData(userId: string) {
  // API 호출
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}
```

### 잘못된 예시

```typescript
// Fetch user data (영어 주석 금지)
async function 사용자가져오기() { // 한국어 함수명 금지
  ...
}
```

---

## 프로젝트 아키텍처

### 디렉토리 구조

```
project-root/
├── app/                    # App Router 라우트
│   ├── layout.tsx          # 루트 레이아웃 (필수)
│   ├── page.tsx            # 홈페이지
│   ├── globals.css         # 전역 스타일 + CSS 변수
│   └── [route]/page.tsx    # 동적 라우트
├── components/             # 재사용 컴포넌트
│   └── ui/                 # shadcn/ui 컴포넌트
├── lib/                    # 유틸리티 함수
│   └── utils.ts            # cn() 함수
├── docs/                   # 프로젝트 문서
└── public/                 # 정적 자산
```

### 핵심 파일 역할

| 파일 | 역할 | 수정 시 주의사항 |
|------|------|------------------|
| `app/layout.tsx` | 루트 레이아웃, 폰트 설정 | `<html>`, `<body>` 태그 필수 포함 |
| `app/globals.css` | 전역 스타일, CSS 변수 | 테마 색상 변경 시 `:root`와 `.dark` 모두 수정 |
| `lib/utils.ts` | `cn()` 유틸리티 | 수정 금지, 그대로 사용 |
| `components.json` | shadcn/ui 설정 | 직접 수정 금지, CLI 사용 |

---

## 코드 표준

### 파일 명명 규칙

| 유형 | 규칙 | 예시 |
|------|------|------|
| 페이지 | `page.tsx` | `app/about/page.tsx` |
| 레이아웃 | `layout.tsx` | `app/dashboard/layout.tsx` |
| 컴포넌트 | PascalCase | `UserProfile.tsx` |
| 유틸리티 | camelCase | `formatDate.ts` |
| 훅 | `use` 접두사 | `useAuth.ts` |

### 컴포넌트 작성 패턴

```typescript
// components/UserCard.tsx
interface UserCardProps {
  name: string;
  email: string;
}

// 함수 선언식 사용
export function UserCard({ name, email }: UserCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-muted-foreground">{email}</p>
    </div>
  );
}
```

### 필수 준수 사항

- **TypeScript 필수**: `.tsx`, `.ts` 확장자만 사용
- **타입 명시**: Props, 반환 타입 명시
- **함수 선언식**: `export function` 형태 사용
- **default export 지양**: named export 우선

---

## 스타일링 표준

### Tailwind CSS 사용법

```typescript
// cn() 함수로 조건부 클래스 병합
import { cn } from "@/lib/utils";

<div className={cn(
  "rounded-lg p-4",           // 기본 스타일
  isActive && "bg-primary",   // 조건부 스타일
  className                    // 외부 전달 클래스
)} />
```

### CSS 변수 테마 시스템

```typescript
// 올바른 사용
<div className="bg-background text-foreground" />
<div className="bg-primary text-primary-foreground" />
<div className="bg-muted text-muted-foreground" />

// 잘못된 사용 (하드코딩 금지)
<div className="bg-white text-black" />
<div className="bg-[#ffffff]" />
```

### 사용 가능한 시맨틱 색상

| 변수 | 용도 |
|------|------|
| `background` / `foreground` | 페이지 배경/텍스트 |
| `primary` / `primary-foreground` | 주요 액션 버튼 |
| `secondary` / `secondary-foreground` | 보조 요소 |
| `muted` / `muted-foreground` | 비활성/보조 텍스트 |
| `accent` / `accent-foreground` | 강조 요소 |
| `destructive` | 삭제/위험 액션 |
| `border` | 테두리 |
| `input` | 입력 필드 테두리 |
| `ring` | 포커스 링 |

### 다크 모드

- `.dark` 클래스로 전환
- CSS 변수가 자동으로 다크 테마 값 적용
- 추가 작업 불필요

---

## 컴포넌트 표준

### shadcn/ui 컴포넌트 추가

```bash
# 컴포넌트 추가 명령어
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

### 컴포넌트 사용

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>제목</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>클릭</Button>
      </CardContent>
    </Card>
  );
}
```

### 아이콘 사용

```typescript
import { User, Settings, LogOut } from "lucide-react";

<Button>
  <User className="mr-2 h-4 w-4" />
  프로필
</Button>
```

---

## 라우팅 표준

### 페이지 생성 규칙

| URL | 파일 경로 |
|-----|-----------|
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` |
| `/dashboard` | `app/dashboard/page.tsx` |

### 레이아웃 적용

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r">
        {/* 사이드바 */}
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
```

### 로딩 상태

```typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return <div className="animate-pulse">로딩 중...</div>;
}
```

### 에러 처리

```typescript
// app/dashboard/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>오류가 발생했습니다</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  );
}
```

---

## 파일 연동 규칙

### 테마 색상 변경 시

**반드시 동시에 수정해야 하는 파일:**

1. `app/globals.css` - `:root` 섹션 (라이트 모드)
2. `app/globals.css` - `.dark` 섹션 (다크 모드)

```css
/* 두 섹션 모두 수정 필수 */
:root {
  --primary: oklch(0.205 0 0);
}

.dark {
  --primary: oklch(0.922 0 0);
}
```

### 새 폰트 추가 시

**수정 파일:** `app/layout.tsx`

```typescript
import { NewFont } from "next/font/google";

const newFont = NewFont({
  variable: "--font-new",
  subsets: ["latin"],
});

// body 클래스에 추가
<body className={`${newFont.variable}`}>
```

### 경로 별칭 추가 시

**수정 파일:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/hooks/*": ["./hooks/*"]  // 새 별칭
    }
  }
}
```

---

## AI 의사결정 기준

### 컴포넌트 위치 결정

```
새 컴포넌트 생성 시:
├── 단일 페이지에서만 사용? → 해당 페이지 폴더 내 _components/
├── 여러 페이지에서 재사용? → components/
└── UI 기본 요소? → shadcn/ui 추가 (components/ui/)
```

### 스타일링 방식 결정

```
스타일 적용 시:
├── 레이아웃/간격? → Tailwind 유틸리티 클래스
├── 색상? → CSS 변수 (bg-primary, text-foreground)
├── 조건부 스타일? → cn() 함수
└── 복잡한 애니메이션? → tw-animate-css 클래스
```

### 파일 생성 결정

```
새 기능 추가 시:
├── 새 페이지? → app/[route]/page.tsx
├── API 엔드포인트? → app/api/[route]/route.ts
├── 재사용 로직? → lib/[name].ts
├── 커스텀 훅? → hooks/use[Name].ts
└── 타입 정의? → types/[name].ts
```

---

## 금지 사항

### 절대 금지

| 항목 | 이유 |
|------|------|
| **Pages Router 사용** | App Router만 사용 |
| **인라인 스타일** | Tailwind CSS 사용 |
| **하드코딩 색상** | CSS 변수 사용 |
| **영어 주석** | 한국어 주석 필수 |
| **any 타입** | 명시적 타입 정의 |
| **console.log 커밋** | 디버깅 코드 제거 |
| **components.json 직접 수정** | CLI 사용 |
| **lib/utils.ts 수정** | 그대로 유지 |

### 잘못된 코드 패턴

```typescript
// 금지: 인라인 스타일
<div style={{ backgroundColor: 'red' }} />

// 금지: 하드코딩 색상
<div className="bg-[#ff0000]" />

// 금지: any 타입
function process(data: any) { ... }

// 금지: Pages Router 구조
// pages/index.tsx (사용 금지)
```

### 올바른 코드 패턴

```typescript
// 권장: Tailwind + CSS 변수
<div className="bg-destructive" />

// 권장: 명시적 타입
function process(data: UserData) { ... }

// 권장: App Router 구조
// app/page.tsx (사용)
```

---

## 개발 명령어 참조

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 검사
```

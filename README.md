# Multi Next.js App

Next.js 16과 React 19 기반의 웹 애플리케이션 프로젝트입니다.

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **UI 라이브러리**: React 19
- **스타일링**: Tailwind CSS 4
- **UI 컴포넌트**: shadcn/ui (new-york 스타일)
- **아이콘**: lucide-react
- **언어**: TypeScript

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

### 프로덕션 빌드

```bash
npm run build
npm run start
```

### 린트 검사

```bash
npm run lint
```

## 프로젝트 구조

```
├── app/                 # App Router 라우트 및 페이지
│   ├── layout.tsx       # 루트 레이아웃
│   ├── page.tsx         # 홈 페이지
│   └── globals.css      # 전역 스타일
├── components/          # 재사용 가능한 컴포넌트
│   └── ui/              # shadcn/ui 컴포넌트
├── lib/                 # 유틸리티 함수
│   └── utils.ts         # cn() 등 헬퍼 함수
├── public/              # 정적 파일
└── docs/                # 프로젝트 문서
```

## shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [컴포넌트명]
```

예시:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

## 경로 별칭

`@/*` 별칭을 사용하여 프로젝트 루트를 참조할 수 있습니다:

```tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

## 참고 문서

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com)

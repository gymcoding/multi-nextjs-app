# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 참조 문서

@docs/nextjs.md

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **React**: 19
- **스타일링**: Tailwind CSS 4 + tw-animate-css
- **UI 컴포넌트**: shadcn/ui (new-york 스타일)
- **아이콘**: lucide-react
- **유틸리티**: clsx, tailwind-merge

## 프로젝트 구조

```
app/              # App Router 라우트 및 페이지
lib/              # 유틸리티 함수 (cn 함수 등)
components/       # 재사용 가능한 컴포넌트
components/ui/    # shadcn/ui 컴포넌트
```

## 경로 별칭

`@/*` 별칭이 프로젝트 루트를 참조합니다:
- `@/components` → 컴포넌트
- `@/lib/utils` → 유틸리티 함수
- `@/components/ui` → shadcn/ui 컴포넌트

## shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [컴포넌트명]
```

## 스타일링 참고사항

- CSS 변수 기반 테마 시스템 사용 (`globals.css`)
- 다크 모드는 `.dark` 클래스로 활성화
- `cn()` 함수로 조건부 클래스 병합: `cn("base-class", condition && "conditional-class")`

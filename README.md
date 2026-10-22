# 방명록 만들기 (세미나용, Next.js)

이름과 메시지를 저장하고 목록으로 보여주는 게시판을 3단계로 만들어 봅니다.

| 단계 | 브랜치 | 데이터 저장 위치 | 한계 |
|---|---|---|---|
| 1. 화면만 만들기 | `step1-ui` | 브라우저 메모리 (React state) | 새로고침하면 사라짐 |
| 2. 서버 연결하기 | `step2-server` | 서버 메모리 (API Route) | 서버를 재시작하면 사라짐 |
| 3. DB 연결하기 | `step3-db` | 데이터베이스 (Supabase) | — |

## 실행 방법

[Node.js](https://nodejs.org) (LTS)가 필요합니다.

```bash
npm install     # 처음 한 번만
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

## 1단계: 화면만 만들기

### 파일 구성
- `app/page.js` — 화면 (입력 폼 + 목록), 저장 버튼 동작
- `app/layout.js` — 모든 페이지를 감싸는 공통 틀 (`<html>`, `<body>`)
- `app/globals.css` — 디자인

### 발표 포인트
1. 이름/메시지를 입력하고 저장하면 목록에 바로 추가된다. (`useState`)
2. **새로고침(F5)을 하면 모두 사라진다.** → 데이터가 브라우저 메모리에만 있기 때문
3. 다른 사람(다른 브라우저)은 내 메시지를 볼 수 없다.
4. 그래서 다음 단계: 데이터를 **서버**에 보관하자!

## 2단계: 서버 연결하기

### 파일 구성
- `app/api/messages/route.js` — 서버 (API Route). 메시지를 서버 메모리에 보관
  - `GET /api/messages` — 메시지 목록 보내주기
  - `POST /api/messages` — 새 메시지 저장하기 (이름/메시지가 비어 있으면 400 에러)
- `app/page.js` — 화면. 이제 `fetch`로 서버에서 목록을 받아오고, 저장도 서버에 요청

### 발표 포인트
1. 브라우저에서 http://localhost:3000/api/messages 를 열면 꾸밈 없는 데이터(JSON)가 보인다. → 사람용이 아니라 프로그램용 주소
2. 화면(`/`)은 이 주소에서 데이터를 받아와 예쁘게 그려준다. (`fetch` + `useEffect`)
3. **새로고침해도 메시지가 남아 있다.** 다른 브라우저에서도 같은 목록이 보인다.
4. 하지만 **서버를 껐다 켜면(`npm run dev` 재시작) 모두 사라진다.** → 데이터가 서버 메모리에만 있기 때문
5. 그래서 다음 단계: 데이터를 **데이터베이스**에 보관하자!

## 3단계: DB 연결하기

### 준비 (처음 한 번만)
1. [Supabase](https://supabase.com)에서 새 프로젝트를 만든다.
2. 대시보드 → **SQL Editor**에 `supabase/schema.sql` 내용을 붙여넣고 **Run** → `messages` 테이블이 생긴다.
3. `.env.example`을 복사해 `.env.local`을 만들고, 대시보드 → **Project Settings**에서 프로젝트 URL과 **Publishable key**(공개키)를 채운다.
4. `npm install` 후 `npm run dev`

### 파일 구성
- `app/api/messages/route.js` — 서버. 이제 메모리 대신 Supabase의 `messages` 테이블에 읽고 쓴다
- `supabase/schema.sql` — 테이블 만드는 SQL
- `.env.local` — DB 접속 정보 (GitHub에 올라가지 않음)
- `app/layout.js` — 맨 위에 "3단계 · DB 연결 완료" 띠 표시 (2단계 사이트와 구분용)
- `app/page.js` — **바뀐 게 없다.** 화면은 서버하고만 대화하기 때문

### 발표 포인트
1. **서버를 껐다 켜도 메시지가 남아 있다.** → 데이터가 DB에 있기 때문
2. Supabase 대시보드 → **Table Editor**에서 저장된 메시지를 직접 볼 수 있다.
3. 화면 코드(`page.js`)는 그대로, 서버(`route.js`)만 바꿨다. → 역할을 나눠 두면 저장 방식을 바꾸기 쉽다
4. 공개키로는 DB 규칙(RLS)이 허락한 일만 할 수 있다. → 읽기·새 글 쓰기만 허용, 수정·삭제는 막힘

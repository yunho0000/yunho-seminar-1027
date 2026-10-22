-- [3단계] Supabase 대시보드 → SQL Editor 에 붙여넣고 Run 하세요.

create table messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) <= 20),
  content text not null check (char_length(content) <= 200),
  created_at timestamptz not null default now()
);

-- 브라우저에서 DB에 직접 접근하지 못하게 잠급니다.
-- 우리 서버(API Route)는 비밀 키로 접속하므로 이 잠금과 상관없이 읽고 쓸 수 있어요.
alter table messages enable row level security;

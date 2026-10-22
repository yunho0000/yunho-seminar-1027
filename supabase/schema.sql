-- [3단계] Supabase 대시보드 → SQL Editor 에 붙여넣고 Run 하세요.

create table messages (
  id bigint generated always as identity primary key,
  -- 빈 칸(공백만 있는 것 포함)과 너무 긴 글은 DB가 직접 막습니다.
  name text not null check (char_length(trim(name)) between 1 and 20),
  content text not null check (char_length(trim(content)) between 1 and 200),
  created_at timestamptz not null default now()
);

-- 기본은 모두 잠그고(RLS), 공개키로는 아래 두 가지만 허용합니다.
alter table messages enable row level security;

-- 누구나 목록 읽기 가능
create policy "누구나 읽기" on messages for select to anon using (true);

-- 누구나 새 글 쓰기 가능 (수정·삭제 규칙은 없으니 막혀 있어요)
create policy "누구나 쓰기" on messages for insert to anon with check (true);

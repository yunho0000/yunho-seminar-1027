import { createClient } from "@supabase/supabase-js";

// [3단계] 데이터는 데이터베이스(Supabase)의 messages 테이블에 저장됩니다.
// → 서버를 껐다 켜도(npm run dev 재시작) 메시지가 그대로 남아 있습니다.
// 접속 정보는 .env.local 파일에서 읽어옵니다. (비밀 키라서 GitHub에 올리지 않아요)
function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
}

// 목록 가져오기: GET /api/messages
export async function GET() {
  const { data, error } = await getSupabase()
    .from("messages")
    .select("id, name, content, createdAt:created_at") // DB의 created_at을 화면에서 쓰던 createdAt 이름으로
    .order("created_at", { ascending: false }); // 최신 글이 위로

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data);
}

// 메시지 저장하기: POST /api/messages
export async function POST(request) {
  const body = await request.json().catch(() => null);
  const name = body?.name?.trim();
  const content = body?.content?.trim();

  if (!name || !content) {
    return Response.json(
      { error: "이름과 메시지를 모두 입력해주세요." },
      { status: 400 }
    );
  }

  const { data, error } = await getSupabase()
    .from("messages")
    .insert({ name: name.slice(0, 20), content: content.slice(0, 200) })
    .select("id, name, content, createdAt:created_at")
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data, { status: 201 });
}

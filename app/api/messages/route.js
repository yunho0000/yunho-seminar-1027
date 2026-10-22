import { connection } from "next/server";

// [2단계] 데이터는 서버 메모리(이 변수)에 저장됩니다.
// → 새로고침해도, 다른 브라우저에서도 같은 목록이 보입니다.
// → 하지만 서버를 껐다 켜면(npm run dev 재시작) 모두 사라집니다. (3단계에서 DB로 옮길 예정)
const messages = [];

// 목록 가져오기: GET /api/messages
export async function GET() {
  await connection(); // 미리 만들어두지 말고, 요청이 올 때마다 최신 목록을 보내기
  return Response.json(messages);
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

  const newMessage = {
    id: Date.now(),
    name: name.slice(0, 20),
    content: content.slice(0, 200),
    createdAt: new Date().toISOString(),
  };

  messages.unshift(newMessage); // 최신 글이 위로
  return Response.json(newMessage, { status: 201 });
}

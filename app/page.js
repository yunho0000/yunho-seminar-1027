"use client"; // useState, 버튼 클릭 같은 브라우저 동작을 쓰려면 필요

import { useEffect, useState } from "react";

export default function Home() {
  // [2단계] 데이터는 서버(/api/messages)에 저장됩니다.
  // → state는 서버에서 받아온 목록을 화면에 보여주는 용도로만 씁니다.
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // 서버에서 목록 가져오기 (GET)
  async function loadMessages() {
    const res = await fetch("/api/messages");
    setMessages(await res.json());
  }

  // 화면이 처음 열릴 때 한 번 목록 가져오기
  useEffect(() => {
    loadMessages();
  }, []);

  // 저장 버튼을 누르면 실행
  async function handleSubmit(event) {
    event.preventDefault(); // 폼 기본 동작(페이지 새로고침) 막기

    if (!name.trim() || !content.trim()) return;

    // 서버에 새 메시지 보내기 (POST)
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, content }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }

    setError("");
    setContent("");
    await loadMessages(); // 서버에서 최신 목록 다시 가져오기
  }

  return (
    <main className="container">
      <h1>방명록</h1>

      {/* 입력 영역 */}
      <form className="card message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          maxLength={20}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="메시지를 남겨주세요"
          maxLength={200}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">저장</button>
      </form>

      {/* 목록 영역 */}
      <section>
        <h2>
          메시지 목록 <span className="count">{messages.length}</span>
        </h2>

        {messages.length === 0 ? (
          <p className="empty">아직 메시지가 없습니다.</p>
        ) : (
          <ul className="message-list">
            {messages.map((msg) => (
              <li key={msg.id} className="card message-item">
                <div className="meta">
                  <span className="name">{msg.name}</span>
                  <span className="date">
                    {new Date(msg.createdAt).toLocaleString("ko-KR")}
                  </span>
                </div>
                <p className="content">{msg.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

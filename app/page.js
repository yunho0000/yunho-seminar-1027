"use client"; // useState, 버튼 클릭 같은 브라우저 동작을 쓰려면 필요

import { useState } from "react";

export default function Home() {
  // [1단계] 데이터는 브라우저 메모리(state)에만 저장됩니다.
  // → 새로고침하면 모두 사라집니다. (2단계에서 서버로 옮길 예정)
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // 저장 버튼을 누르면 실행
  function handleSubmit(event) {
    event.preventDefault(); // 폼 기본 동작(페이지 새로고침) 막기

    if (!name.trim() || !content.trim()) return;

    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages([newMessage, ...messages]); // 최신 글이 위로
    setContent("");
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

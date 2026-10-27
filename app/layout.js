import "./globals.css";

export const metadata = {
  title: "방명록 (1단계)",
  description: "이름과 메시지를 남기는 방명록",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* [1단계] 다른 단계 사이트와 구분하기 위한 표시 (page.js는 그대로 둡니다) */}
        <div className="step-badge">1단계 · 브라우저 메모리 저장</div>
        {children}
      </body>
    </html>
  );
}

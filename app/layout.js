import "./globals.css";

export const metadata = {
  title: "방명록 (3단계)",
  description: "이름과 메시지를 남기는 방명록",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* [3단계] 2단계 사이트와 구분하기 위한 표시 (page.js는 그대로 둡니다) */}
        <div className="step-badge">3단계 · DB 연결 완료</div>
        {children}
      </body>
    </html>
  );
}

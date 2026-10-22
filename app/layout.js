import "./globals.css";

export const metadata = {
  title: "방명록",
  description: "이름과 메시지를 남기는 방명록",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

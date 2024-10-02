import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import DarkMode from "../components/DarkMode";

export const metadata: Metadata = {
  title: "네비게이션바",
  description: "헤더 부분으로 어디든지 이동할 수 있습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="h-10 flex flex-row justify-evenly items-center bg-gray-200">
          <Link
            href="/"
            className="text-black hover:text-blue-800 hover:underline"
          >
            홈
          </Link>
          <Link
            href="/champions"
            className="text-black hover:text-blue-800 hover:underline"
          >
            챔피언 목록
          </Link>
          <Link
            href="/items"
            className="text-black hover:text-blue-800 hover:underline"
          >
            아이템 목록
          </Link>
          <Link
            href="/rotation"
            className="text-black hover:text-blue-800 hover:underline"
          >
            챔피언 로테이션
          </Link>
          <Link
            href="/worldcup"
            className="text-black hover:text-blue-800 hover:underline"
          >
            챔피언 월드컵
          </Link>
          <DarkMode />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

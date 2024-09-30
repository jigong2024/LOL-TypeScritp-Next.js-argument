import { Metadata } from "next";
import Link from "next/link";
import React from "react";

// 정적 메타 데이터
export const metadata: Metadata = {
  title: "리그 오브 레전드 정보 앱",
  description: "Riot Games API를 활용하여 챔피언과 아이템 정보를 제공합니다.",
};

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-items-start gap-10 mt-10">
      <h1>리그 오브 레전드 정보 앱</h1>
      <h3>Riot Games API를 활용하여 챔피언과 아이템 정보를 제공합니다.</h3>
      <div className="flex flex-col">
        <Link href="/champions">챔피언 목록</Link>
        <Link href="/rotation">금주 로테이션</Link>
        <Link href="/items">아이템 목록보기</Link>
      </div>
    </div>
  );
};

export default HomePage;

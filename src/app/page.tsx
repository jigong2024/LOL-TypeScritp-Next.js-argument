import { Metadata } from "next";
// import "../styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import poroImage from "../public/img/poro.png";
import rotationImage from "../public/img/rotation.png";
import itemImage from "../public/img/item.png";

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
        <Link href="/champions">
          <Image src={poroImage} alt="챔피언 목록" width={500} height={300} />
          <p>챔피언 목록</p>
        </Link>

        <Link href="/rotation">
          <Image
            src={rotationImage}
            alt="금주 로테이션"
            width={500}
            height={300}
          />
          <p>금주 로테이션</p>
        </Link>
        <Link href="/items">
          <Image src={itemImage} alt="아이템 목록" width={500} height={300} />

          <p>아이템 목록보기</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

import { Metadata } from "next";
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
      <h1 className="text-[30px] text-red-500 font-extrabold ">
        리그 오브 레전드 정보 앱
      </h1>
      <h3>Riot Games API를 활용하여 챔피언과 아이템 정보를 제공합니다.</h3>
      <div className="flex flex-col gap-10">
        <div>
          <Link href="/champions">
            <Image src={poroImage} alt="챔피언 목록" width={500} height={300} />
            <div className="text-center mt-2 text-green-700">챔피언 목록</div>
          </Link>
        </div>

        <div>
          <Link href="/rotation">
            <Image
              src={rotationImage}
              alt="금주 로테이션"
              width={500}
              height={300}
            />
            <p className="text-center mt-2 text-green-700">금주 로테이션</p>
          </Link>
        </div>

        <div>
          <Link href="/items">
            <Image src={itemImage} alt="아이템 목록" width={500} height={300} />
            <p className="text-center mt-2 mb-16 text-green-700">
              아이템 목록보기
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

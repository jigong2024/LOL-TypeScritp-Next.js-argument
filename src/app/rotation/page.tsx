"use client";

import ChampionCard from "@/components/ChampionCard";
import { Champion } from "@/types/Champion";
import { ChampionRotation } from "@/types/ChampionRotation";
import { getChampionRotation } from "@/utils/rioApi";
import { getChampionList, getVersion } from "@/utils/serverApi";
import { useEffect, useState } from "react";

function RotationPage() {
  const [version, setVersion] = useState<string | null>(null);
  const [freeChampions, setFreeChampions] = useState<Champion[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rotationData, championData, versionData]: [
          ChampionRotation,
          Champion[],
          string
        ] = await Promise.all([
          getChampionRotation(),
          getChampionList(),
          getVersion(),
        ]);

        setVersion(versionData);

        // key값에 맞는 챔피언 목록
        const freeChampionList: Champion[] = rotationData?.freeChampionIds
          .map((id) =>
            championData.find((champion) => champion.key === String(id))
          )
          .filter((champion): champion is Champion => champion !== undefined);

        setFreeChampions(freeChampionList);

        // console.log("업데이트 전", freeChampionList);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("업데이트 후", freeChampions);
  //   console.log("버전 업데이트", version);
  // }, [freeChampions, version]);

  if (error) return <div>error: {error}</div>;
  // 데이터가 모두 로드되었는지 확인
  if (freeChampions.length === 0 || version === null) {
    return <div>데이터 로딩 중...</div>;
  }

  // 데이터가 모두 준비되었을 때만 ChampionCard 컴포넌트 렌더링
  return <ChampionCard champions={freeChampions} version={version} />;
}

export default RotationPage;

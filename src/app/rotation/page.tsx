"use client";

import ChampionCard from "@/components/championCard";
import { Champion } from "@/types/Champion";
import { ChampionRotation } from "@/types/ChampionRotation";
import { getChampionRotation } from "@/utils/rioApi";
import { getChampionList, getVersion } from "@/utils/serverApi";
import { useEffect, useState } from "react";

function RotationPage() {
  const [rotation, setRotation] = useState<ChampionRotation | null>(null);
  const [champions, setChampions] = useState<Champion[]>([]);
  const [version, setVersion] = useState<string | null>(null);
  const [freeChampions, setFreeChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rotationData, championData, versionData] = await Promise.all([
          getChampionRotation(),
          getChampionList(),
          getVersion(),
        ]);

        setRotation(rotationData);
        setChampions(championData);
        setVersion(versionData);

        // console.log("로테이션 데이터", rotationData);
        // console.log("챔피언 데이터", championData);

        // console.log("freeChampionIds:", rotationData.freeChampionIds);
        // console.log(
        // "champions keys:",
        // championData.map((c) => c.key)
        // );

        // key값에 맞는 챔피언 목록
        const freeChampionList: Champion[] = rotationData?.freeChampionIds
          .map((id) =>
            championData.find((champion) => champion.key === String(id))
          )
          .filter((champion): champion is Champion => champion !== undefined);

        console.log("업데이트 전", freeChampionList);

        setFreeChampions(freeChampionList);

        console.log("업데이트 후", freeChampions);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("업데이트 후", freeChampions);
  // }, [freeChampions]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>error: {error}</div>;

  return <ChampionCard champion={freeChampions} version={version} />;
}

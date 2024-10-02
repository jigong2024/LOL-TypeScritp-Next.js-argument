"use client";

import ChampionCard from "@/components/ChampionCard";
import { useChampionStore } from "@/store/rotationStore";
import { useEffect } from "react";

function RotationPage() {
  const { freeChampions, version, error, fetchChampions } = useChampionStore();

  useEffect(() => {
    fetchChampions();
  }, [fetchChampions]);

  if (error) return <div>error: {error}</div>;
  // 데이터가 모두 로드되었는지 확인
  if (freeChampions.length === 0 || version === null) {
    return <div>데이터 로딩 중...</div>;
  }

  // 데이터가 모두 준비되었을 때만 ChampionCard 컴포넌트 렌더링
  return <ChampionCard champions={freeChampions} version={version} />;
}

export default RotationPage;

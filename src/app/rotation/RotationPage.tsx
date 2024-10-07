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
  return (
    <div className="container mx-auto px-3">
      <h1 className="text-2xl font-bold my-8">로테이션 챔피언 목록</h1>
      <ChampionCard champions={freeChampions} version={version} />
    </div>
  );
}

export default RotationPage;

import ChampionCard from "@/components/ChampionCard";
import { Champion } from "@/types/Champion";
import { getChampionList, getVersion } from "@/utils/serverApi";
import { Metadata } from "next";

export const revalidate = 86400; // 1일(86400초) 후 재검증(ISR)

// 정적 메타 데이터
export const metadata: Metadata = {
  title: "챔피언 목록",
  description: "리그 오브 레전드 챔피언 목록을 제공합니다.",
};

async function ChampionPage() {
  // 서버 액션 함수 호출해서 챔피언 목록 가져오기
  const champions: Champion[] = await getChampionList();
  const version: string = await getVersion();

  return (
    <div>
      <h1 className="text-2xl font-bold m-8">챔피언 목록</h1>
      <ChampionCard champions={champions} version={version} />;
    </div>
  );
}

export default ChampionPage;

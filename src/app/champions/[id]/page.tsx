import { ChampionDetail } from "@/types/Champion";
import { getChampionDetail, getVersion } from "@/utils/serverApi";
import { Metadata } from "next";
import Image from "next/image";

export const revalidate = 86400; // 1일(86400초) 후 재검증(ISR)

// 동적 메타 데이터
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const championId = params.id;
  const championDetail = await getChampionDetail(championId);

  return {
    title: `${championDetail.name} - 리그 오브 레전드 챔피언 정보`,
    description: championDetail.blurb,
  };
}

async function ChampionDetailPage({ params }: { params: { id: string } }) {
  const championId = params.id;
  const championDetail: ChampionDetail = await getChampionDetail(championId);
  const version: string = await getVersion();

  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex flex-col items-center gap-10 mt-8 mb-10 lg:mb-5">
        <div>
          <div className="text-[20px] font-bold text-red-500">
            {championDetail.name}
          </div>
          <div>{championDetail.title}</div>
        </div>

        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championDetail.image.full}`}
          alt={championDetail.name}
          width={300}
          height={300}
        />
        <div>{championDetail.blurb}</div>
        <div className="flex flex-col">
          <p className="mb-3 text-blue-500">스탯</p>
          <span className="text-blue-500">{`공격력: ${championDetail.info.attack}`}</span>
          <span className="text-blue-500">{`방어력: ${championDetail.info.defense}`}</span>
          <span className="text-blue-500">{`마법력: ${championDetail.info.magic}`}</span>
          <span className="text-blue-500">{`난이도: ${championDetail.info.difficulty}`}</span>
        </div>
      </div>
    </div>
  );
}

export default ChampionDetailPage;

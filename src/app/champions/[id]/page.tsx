import { ChampionDetail } from "@/types/Champion";
import { getChampionDetail, getVersion } from "@/utils/serverApi";
import Image from "next/image";

export const revalidate = 86400; // 1일(86400초) 후 재검증(ISR)

async function ChampionDetailPage({ params }: { params: { id: string } }) {
  const championId = params.id;
  const championDetail: ChampionDetail = await getChampionDetail(championId);
  const version: string = await getVersion();

  return (
    <div>
      <div>
        <div>{championDetail.name}</div>
        <div>{championDetail.title}</div>
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championDetail.image.full}`}
          alt={championDetail.name}
          width={300}
          height={300}
        />
        <div>{championDetail.blurb}</div>

        <p>스탯</p>
        <span>{`공격력: ${championDetail.info.attack}`}</span>
        <span>{`방어력: ${championDetail.info.defense}`}</span>
        <span>{`마법력: ${championDetail.info.magic}`}</span>
        <span>{`난이도: ${championDetail.info.difficulty}`}</span>
      </div>
    </div>
  );
}

export default ChampionDetailPage;

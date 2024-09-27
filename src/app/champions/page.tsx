import { getChampionList, getVersion } from "@/utils/serverApi";
import Image from "next/image";

async function ChampionPage() {
  // 서버 액션 함수 호출해서 챔피언 목록 가져오기
  const champions = await getChampionList();
  const version = await getVersion();

  return (
    <div>
      <h1>챔피언 목록</h1>
      <div>
        {champions.map((champion) => {
          return (
            <div key={champion.id}>
              <p>{champion.name}</p>
              <p>{champion.title}</p>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                alt={champion.name}
                width={120}
                height={220}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChampionPage;

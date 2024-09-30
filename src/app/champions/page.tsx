import { Champion } from "@/types/Champion";
import { getChampionList, getVersion } from "@/utils/serverApi";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400; // 1일(86400초) 후 재검증(ISR)

async function ChampionPage() {
  // 서버 액션 함수 호출해서 챔피언 목록 가져오기
  const champions: Champion[] = await getChampionList();
  const version: string = await getVersion();

  return (
    <div className="container mx-auto px-3">
      <h1 className="text-2xl font-bold my-4">챔피언 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {champions.map((champion) => {
          return (
            <Link href={`/champions/${champion.id}`} key={champion.id}>
              <div className="border border-black rounded-md p-4">
                <p>{champion.name}</p>
                <p>{champion.title}</p>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                  alt={champion.name}
                  width={120}
                  height={120}
                  className="mx-auto mt-2"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ChampionPage;

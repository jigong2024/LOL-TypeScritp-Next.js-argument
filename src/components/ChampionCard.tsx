import { Champion } from "@/types/Champion";
import Image from "next/image";
import Link from "next/link";

export const ChampionCard = ({
  champions,
  version,
}: {
  champions: Champion[];
  version: string;
}) => {
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
};

export default ChampionCard;

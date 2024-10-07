"use client";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {champions &&
        champions.map((champion) => {
          return (
            <Link href={`/champions/${champion.id}`} key={champion.id}>
              <div className="border border-black rounded-md p-4 bg-gray-200">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`}
                  alt={champion.name}
                  width={120}
                  height={120}
                  className="mx-auto mb-3"
                />
                <p className="font-bold text-[20px] text-red-500">
                  {champion.name}
                </p>
                <p className="dark:text-black">{champion.title}</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default ChampionCard;

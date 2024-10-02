"use client";

import { useChampionStore } from "@/store/rotationStore";
import { Champion } from "@/types/Champion";
import Image from "next/image";
import { useEffect, useState } from "react";

function WorldCupPage() {
  const { freeChampions, fetchChampions, version } = useChampionStore();
  const [currentPair, setCurrentPair] = useState<[Champion, Champion] | null>(
    null
  );
  const [currentRound, setCurrentRound] = useState<Champion[]>([]);
  const [nextRound, setNextRound] = useState<Champion[]>([]);
  const [winner, setWinner] = useState<Champion | null>(null);
  const [roundNumber, setRoundNumber] = useState<number>(1);

  // fetchChampions 함수로 freeChampions 배열 가져오기
  useEffect(() => {
    fetchChampions();
  }, [fetchChampions]);

  // freeChampions 가져오면 무작위로 섞기
  useEffect(() => {
    if (freeChampions.length > 0) {
      const mixed = shuffleChampions(freeChampions);
      setCurrentRound(mixed);
    }
  }, [freeChampions]);

  // 현재 페어 표시
  useEffect(() => {
    if (currentRound.length >= 2) {
      setCurrentPair([currentRound[0], currentRound[1]]);
    } else if (currentRound.length === 1) {
      // 부전승 처리
      setNextRound((prev) => [...prev, currentRound[0]]);
      setCurrentRound([]);
    } else if (currentRound.length === 0 && nextRound.length > 0) {
      if (nextRound.length === 1) {
        // 우승자 결정
        setWinner(nextRound[0]);
      } else {
        setCurrentRound(shuffleChampions(nextRound));
        setNextRound([]);
        setRoundNumber((prev) => prev + 1);
        alert(`${roundNumber + 1} 라운드가 시작됩니다!`);
      }
    }
  }, [currentRound, nextRound, roundNumber]);

  // 사용자 선택 처리
  const handleChoice = (chosen: Champion) => {
    setNextRound((prev) => [...prev, chosen]);
    setCurrentRound((prev) => prev.slice(2));
  };

  // 무작위 섞기 함수
  const shuffleChampions = (champions: Champion[]) => {
    return [...champions].sort(() => Math.random() - 0.5);
  };

  return (
    <div className="w-full mt-10">
      <div className="container mx-auto px-3">
        {winner ? (
          <div className="flex flex-col items-center gap-10">
            <h1 className="font-bold text-[30px]">🥇 우승 챔피언 🥇</h1>

            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${winner.image.full}`}
              alt={winner.name}
              width={400}
              height={400}
            />
            <p className="font-bold text-[20px] text-red-500">{winner.name}</p>
            <p>{winner.title}</p>
          </div>
        ) : currentPair ? (
          <div className="flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold text-[30px]">🏆 챔피언 월드컵 🏆</h1>
            <div className="flex flex-row gap-10">
              {currentPair.map((champion) => (
                <div
                  key={champion.id}
                  className="flex flex-col items-center gap-6 cursor-pointer"
                  onClick={() => handleChoice(champion)}
                >
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                    alt={champion.name}
                    width={400}
                    height={400}
                  />

                  <p className="font-bold text-[20px] text-red-500">
                    {champion.name}
                  </p>
                  <p>{champion.title}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>로딩 중...</div>
        )}
      </div>
    </div>
  );
}

export default WorldCupPage;

"use client";

import { create } from "zustand";
import { Champion } from "@/types/Champion";
import { getChampionRotation } from "@/utils/rioApi";
import { getChampionList, getVersion } from "@/utils/serverApi";
import { ChampionRotation } from "@/types/ChampionRotation";

type ChampionStore = {
  freeChampions: Champion[];
  version: string | null;
  error: string | null;
  fetchChampions: () => Promise<void>;
};

export const useChampionStore = create<ChampionStore>((set) => ({
  freeChampions: [],
  version: null,
  error: null,
  fetchChampions: async () => {
    try {
      const [rotationData, championData, versionData]: [
        ChampionRotation,
        Champion[],
        string
      ] = await Promise.all([
        getChampionRotation(),
        getChampionList(),
        getVersion(),
      ]);

      // key값에 맞는 챔피언 목록
      const freeChampionList = rotationData?.freeChampionIds
        .map((id) =>
          championData.find((champion) => champion.key === String(id))
        )
        .filter((champion): champion is Champion => champion !== undefined);

      set({
        freeChampions: freeChampionList,
        version: versionData,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching data", error);
      set({ error: "데이터를 불러오는 중 오류가 발생했습니다." });
    }
  },
}));

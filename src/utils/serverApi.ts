"use server";

import { Champion, ChampionDetail } from "@/types/Champion";
import { Item } from "@/types/Item";

// 최신 버전 가져오는 함수
const getVersion = async (): Promise<string> => {
  try {
    const versionResponse = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    if (!versionResponse.ok) {
      throw new Error("Failed to fetch version data");
    }

    const versions: string[] = await versionResponse.json();
    return versions[0];
  } catch (error) {
    console.error("Error fetching version:", error);
    throw error;
  }
};

// 챔피언 목록 가져오는 함수
export const getChampionList = async (): Promise<Champion[]> => {
  try {
    // 최신 버전 가져오기
    const version = await getVersion();

    // 버전에 맞춰 챔피언 목록 가져오기
    const championListResponse = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
    );

    if (!championListResponse.ok) {
      throw new Error("Failed to fetch champion list data");
    }

    const { data }: { data: Record<string, any> } =
      await championListResponse.json();

    // 필요한 챔피언 데이터만 추출
    const championList: Champion[] = Object.values(data).map((champion) => ({
      id: champion.id,
      name: champion.name,
      title: champion.title,
      image: {
        full: champion.image.full,
      },
    }));

    return championList;
  } catch (error) {
    console.error("Error fetching champion list:", error);
    throw error;
  }
};

// 특정 챔피언 상세 정보 가져오기
export const getChampionDetail = async (
  id: string
): Promise<ChampionDetail> => {
  try {
    // 최신 버전 가져오기
    const version = await getVersion();

    // 버전에 맞춰 특정 챔피언 디테일 데이터 가져오기
    const championDetailResponse = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion/${id}.json`
    );

    if (!championDetailResponse.ok) {
      throw new Error("Failed to fetch champion detail data");
    }

    const { data }: { data: Record<string, any> } =
      await championDetailResponse.json();

    // 특정 챔피언 데이터
    const champion = data[id];

    if (!champion) {
      throw new Error(`Champion data for ${id} not found`);
    }

    const championDetail: ChampionDetail = {
      id: champion.id,
      name: champion.name,
      title: champion.title,
      image: {
        full: champion.image.full,
      },
      blurb: champion.blurb,
      info: {
        attack: champion.info.attack,
        defense: champion.info.defense,
        magic: champion.info.magic,
        difficulty: champion.info.difficulty,
      },
    };

    return championDetail;
  } catch (error) {
    console.error("Error fetching champion detail:", error);
    throw error;
  }
};

// 아이템 목록 가져오기
export const getItemList = async (): Promise<Item[]> => {
  try {
    // 최신 버전 가져오기
    const version = await getVersion();

    // 버전에 맞춰 아이템 불러오기
    const itemListResponse = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/item.json`
    );

    if (!itemListResponse.ok) {
      throw new Error("Failed to fetch item list");
    }

    const { data }: { data: Record<string, any> } =
      await itemListResponse.json();

    const itemList: Item[] = Object.entries(data).map(([id, item]) => ({
      id: id,
      name: item.name,
      description: item.description,
      image: {
        full: item.image.full,
      },
    }));

    return itemList;
  } catch (error) {
    console.error("Error fetching item list:", error);
    throw error;
  }
};

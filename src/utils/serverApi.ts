import { Champion } from "@/types/Champion";

export const getChampionList = async () => {
  "use server";

  try {
    // 최신 버전 가져오기
    const versionResponse = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    if (!versionResponse.ok) {
      throw new Error("Failed to fetch version data");
    }

    const versions: string[] = await versionResponse.json();
    const latestVersion = versions[0];

    // 버전에 맞춰 챔피언 목록 가져오기
    const championListResponse = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`
    );

    if (!championListResponse.ok) {
      throw new Error("Failed to fetch champion list data");
    }

    const fullChampionListData: { data: Record<string, any> } =
      await championListResponse.json();

    // 필요한 챔피언 데이터만 추출
    const championList: Champion[] = Object.values(
      fullChampionListData.data
    ).map((champion) => ({
      id: champion.id,
      name: champion.name,
      title: champion.title,
      image: champion.image,
    }));

    return championList;
  } catch (error) {
    console.error("Error fetching champion list:", error);
    throw error;
  }
};

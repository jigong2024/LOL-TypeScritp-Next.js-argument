import { ChampionRotation } from "@/types/ChampionRotation";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.RIOT_API_KEY;
  console.log("api=======>", apiKey);

  if (!apiKey) {
    // NextResponse는 Next.js에서 제공하는 API 응답 생성 유틸리티, 서버사이드에서 클라이언트로 응답을 보낼 때 사용
    return NextResponse.json({ error: "API key not found" });
  }

  try {
    const response = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        headers: {
          "X-Riot-Token": apiKey,
        },
      }
    );

    // 응답 상태가 성공(200-299범위 상태의 코드)인지 나타내는 불리언
    if (!response.ok) {
      console.log("오류!!!!!!!", response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChampionRotation = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching champion rotation", error);

    return NextResponse.json(
      { error: "Failed to fetch champion rotation" },
      { status: 500 }
    );
  }
}

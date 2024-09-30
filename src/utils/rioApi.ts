import { ChampionRotation } from "@/types/ChampionRotation";

export async function getChampionRotation(): Promise<ChampionRotation> {
  const response = await fetch("/api/rotation");

  if (!response.ok) {
    throw new Error("Failed to fetch rotation data");
  }

  return response.json();
}

// Champion 타입 (목록에서 사용할 기본 정보)
export interface Champion {
  id: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
}

// ChampionDetail 타입 (상세 정보 페이지에서 사용할 정보)
export interface ChampionDetail extends Champion {
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
}

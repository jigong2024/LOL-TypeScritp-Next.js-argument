// 아이템 목록 전체 응답 구조
export interface ItemData {
  [itemId: string]: ItemInfo;
}

export interface ItemInfo {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  into: string[];
  from: string[];
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  gold: {
    base: number;
    purchasable: boolean;
    total: number;
    sell: number;
  };
  tags: string[];
  maps: {
    [mapId: string]: boolean;
  };
  stats: {
    [statName: string]: number;
  };
  depth: number;
}

// 사용할 Item 정보 타입
export interface Item {
  id: string;
  name: string;
  plaintext: string;
  image: {
    full: string;
  };
}

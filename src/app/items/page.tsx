import { getItemList, getVersion } from "@/utils/serverApi";
import Image from "next/image";

async function ItemPage() {
  // 서버 액션 함수 호출해서 아이템 목록 가져오기
  const items = await getItemList();
  const version = await getVersion();

  return (
    <div>
      <h1>아이템 목록</h1>
      <div>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>{item.plaintext}</p>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
                alt={item.name}
                width={64}
                height={64}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemPage;

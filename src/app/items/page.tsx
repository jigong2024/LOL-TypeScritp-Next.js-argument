import { getItemList, getVersion } from "@/utils/serverApi";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "아이템 목록",
  description: "리그 오브 레전드 아이템 목록을 제공합니다.",
};

async function ItemPage() {
  // 서버 액션 함수 호출해서 아이템 목록 가져오기
  const items = await getItemList();
  const version = await getVersion();

  return (
    <div className="container mx-auto px-3">
      <h1 className="text-2xl font-bold my-4">아이템 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          return (
            <div key={item.id} className="border border-black rounded-md p-4">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
                alt={item.name}
                width={120}
                height={120}
                className="mx-auto mb-3"
              />
              <p>{item.name}</p>
              <p>{item.plaintext}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemPage;

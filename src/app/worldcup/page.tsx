import { Metadata } from "next";
import WorldCupPage from "./WorldcupPage";

export const metadata: Metadata = {
  title: "챔피언 월드컵",
  description: "챔피언 월드컵 서비스를 제공합니다.",
};

function Page() {
  return <WorldCupPage />;
}

export default Page;

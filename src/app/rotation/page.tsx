import { Metadata } from "next";
import RotationPage from "./RotationPage";

export const metadata: Metadata = {
  title: "금주 로테이션",
  description: "리그 오브 레전드 금주 로테이션 챔피언 목록 제공합니다.",
};

function Page() {
  return <RotationPage />;
}

export default Page;

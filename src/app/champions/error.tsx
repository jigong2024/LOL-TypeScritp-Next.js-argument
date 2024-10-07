"use client";

import { ErrorComponentProps } from "@/types/Error";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center gap-6 mt-10">
      <h2 className="font-bold text-[30px] text-red-500">
        문제가 발생했습니다.
      </h2>
      <p className="bg-gray-200 max-w-md w-full break-words text-center dark:text-black">
        {error.message}
      </p>
      <div className="flex flex-wrap gap-5">
        <button
          onClick={handleRefresh}
          className="border-2 border-blue-300 bg-blue-300 rounded-md text-white px-1"
        >
          새로고침
        </button>
        <button
          onClick={handleHome}
          className="border-2 border-blue-300 bg-blue-300 rounded-md text-white px-1"
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}

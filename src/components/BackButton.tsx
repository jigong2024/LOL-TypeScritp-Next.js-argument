"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="pt-11">
      <button
        onClick={() => router.back()}
        className="text-[30px] w-11 rounded-md hover:bg-blue-200 dark:bg-white dark:hover:bg-blue-200"
      >
        🔙
      </button>
    </div>
  );
};

export default BackButton;

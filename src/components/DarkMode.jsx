"use client";

import { useEffect, useState } from "react";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 localStorage 확인
    const storedDarkMode = localStorage.getItem("darkMode") === "true";

    setDarkMode(storedDarkMode);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!mounted) {
    return <div>로딩 중...</div>;
  }

  return <button onClick={toggleDarkMode}>{darkMode ? "🌝" : "🌚"}</button>;
};

export default DarkMode;

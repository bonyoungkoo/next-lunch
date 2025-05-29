"use client";

import { useEffect, useState } from "react";
import { FoodHistory } from "@/types/food";
import FoodHistoryList from "@/app/components/FoodHistoryList";

export default function Page() {
  const [history, setHistory] = useState<FoodHistory[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("food-history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">선택 기록</h1>
      <FoodHistoryList history={history} />
    </div>
  );
}

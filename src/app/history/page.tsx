"use client";

import { useEffect, useState } from "react";
import { FoodHistory } from "@/types/food";

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
      <div className="space-y-4">
        {history.length > 0 ? (
          history.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-gray-200 rounded-xl hover:border-gray-400 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{item.food.name}</h2>
                  <p className="text-gray-600">
                    {item.food.category} · {item.food.price.toLocaleString()}원
                  </p>
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(item.selectedAt).toLocaleDateString()}
                </time>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            아직 선택한 메뉴가 없습니다
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { WheelDataType } from "react-custom-roulette";
import { Food, FoodCategory } from "@/types/food";
import SkeletonRoulette from "@/components/SkeletonRoulette";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  {
    ssr: false,
    loading: () => <SkeletonRoulette />,
  }
);

type WheelFood = WheelDataType & Food;

export const CONFIG = {
  MENU_COUNT: 20,
  SPIN_DURATION: 1000,
} as const;

export default function Roulette({ menus }: { menus: Food[] }) {
  const [data, setData] = useState<WheelFood[]>([]);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [isSpin, setIsSpin] = useState<boolean>(false);
  const [pickedMenu, setPickedMenu] = useState<Food>();
  const [selectedCategory, setSelectedCategory] = useState<
    FoodCategory | "전체"
  >("전체");
  const [showResult, setShowResult] = useState<boolean>(false);

  const categories = ["전체", ...Object.values(FoodCategory)];

  useEffect(() => {
    if (menus.length > 0) {
      getRandomMenus();
    }
  }, [menus, selectedCategory]);

  const getRandomMenus = useCallback(() => {
    const filteredByCategory =
      selectedCategory === "전체"
        ? menus
        : menus.filter((menu) => menu.category === selectedCategory);

    const randomIdSet = new Set();
    const maxMenus = Math.min(20, filteredByCategory.length);

    while (randomIdSet.size < maxMenus) {
      const randomIndex = Math.floor(Math.random() * filteredByCategory.length);
      randomIdSet.add(filteredByCategory[randomIndex].id);
    }

    const filteredMenus = filteredByCategory.filter((menu: Food) =>
      randomIdSet.has(menu.id)
    );

    const data = filteredMenus.map((menu: Food) => {
      return {
        ...menu,
        option: menu.name,
      };
    });
    setData(data);
  }, [menus, selectedCategory]);

  const getRandomNumber = (range: number) => {
    return Math.floor(Math.random() * range);
  };

  const handleSpinRoulette = () => {
    const prizeNumber = getRandomNumber(CONFIG.MENU_COUNT);
    setPrizeNumber(prizeNumber);
    setPickedMenu(data[prizeNumber]);
    setShowResult(false);
    setIsSpin(true);
    setTimeout(() => setIsSpin(false), 100);
  };

  const handleRefreshRoulette = () => {
    getRandomMenus();
    setShowResult(false);
  };

  const onStopSpinning = () => {
    if (pickedMenu) {
      const historyItem = {
        id: crypto.randomUUID(),
        food: pickedMenu,
        selectedAt: new Date().toISOString(),
      };

      const savedHistory = localStorage.getItem("food-history");
      const history = savedHistory ? JSON.parse(savedHistory) : [];
      localStorage.setItem(
        "food-history",
        JSON.stringify([historyItem, ...history])
      );
    }
    setShowResult(true);
  };

  return (
    <div className="flex flex-col min-h-[600px] overflow-hidden">
      <div className="relative w-full px-4 mb-2">
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value as FoodCategory | "전체")
          }
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 font-medium focus:outline-none focus:border-black transition-colors cursor-pointer"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div className="relative h-[450px] w-full flex justify-center items-center">
          {data.length ? (
            <div className="absolute inset-0 flex justify-center items-center">
              <Wheel
                mustStartSpinning={isSpin}
                prizeNumber={prizeNumber}
                data={data}
                textColors={["#ffffff"]}
                onStopSpinning={onStopSpinning}
                radiusLineWidth={1}
                pointerProps={{
                  style: {
                    transform: "scale(0.8)",
                  },
                }}
              />
            </div>
          ) : (
            <SkeletonRoulette />
          )}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="w-32 px-4 py-2 font-semibold text-white bg-black border border-black rounded-2xl cursor-pointer hover:bg-white hover:text-black transition-colors duration-200"
            onClick={handleSpinRoulette}
          >
            돌림판 돌리기
          </button>
          <button
            className="w-32 px-4 py-2 font-semibold text-black bg-white border border-black rounded-2xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-200"
            onClick={handleRefreshRoulette}
          >
            돌림판 리롤
          </button>
        </div>
        {showResult && pickedMenu && (
          <div className="text-center mt-8">
            <p className="text-xl font-medium mb-2">
              오늘의 추천 메뉴는{" "}
              <span className="font-bold text-2xl">{pickedMenu.name}</span>{" "}
              입니다
            </p>
            <p className="text-gray-600">
              예상 메뉴의 평균 가격은{" "}
              <span className="font-semibold">
                {pickedMenu.price.toLocaleString()}원
              </span>{" "}
              입니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

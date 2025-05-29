"use client";

import { Food, FoodCategory } from "@/types/food";
import { useMemo } from "react";

interface MenuListProps {
  menus: Food[];
}

export default function MenuList({ menus }: MenuListProps) {
  const menusByCategory = useMemo(() => {
    return Object.values(FoodCategory).reduce(
      (acc, category) => {
        acc[category] = menus.filter((menu) => menu.category === category);
        return acc;
      },
      {} as Record<FoodCategory, Food[]>
    );
  }, [menus]);

  return (
    <div className="space-y-8">
      {Object.entries(menusByCategory).map(
        ([category, categoryMenus]) =>
          categoryMenus.length > 0 && (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryMenus.map((menu) => (
                  <div
                    key={menu.id}
                    className="p-4 border border-gray-200 rounded-xl hover:border-gray-400 transition-colors"
                  >
                    <h3 className="font-medium text-lg">{menu.name}</h3>
                    <p className="text-gray-600">
                      {menu.price.toLocaleString()}원
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}

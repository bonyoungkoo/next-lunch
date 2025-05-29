import foods from "@/mock/foods.json";
import MenuList from "@/components/MenuList";
import { Food } from "@/types/food";

export default function Page() {
  const menus = foods as Food[];

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">전체 메뉴</h1>
      <MenuList menus={menus} />
    </div>
  );
}

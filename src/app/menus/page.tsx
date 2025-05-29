import foods from "@/mock/foods.json";
import MenuList from "@/components/MenuList";
import { Food } from "@/types/food";

export default function Page() {
  const menus = foods as Food[];

  return (
    <div className="-m-4">
      <div className="sticky top-0 bg-white p-4">
        <h1 className="text-2xl font-bold">전체 메뉴</h1>
      </div>
      <div className="p-4 max-w-5xl mx-auto h-[calc(100vh-10rem)] overflow-auto">
        <MenuList menus={menus} />
      </div>
    </div>
  );
}

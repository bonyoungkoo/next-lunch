import Roulette from "@/components/Roulette";
import foods from "@/mock/foods.json";
import { Food } from "@/types/food";

export default function Home() {
  return (
    <>
      <Roulette menus={foods as Food[]} />
    </>
  );
}

export enum FoodCategory {
  KOREAN = "한식",
  CHINESE = "중식",
  JAPANESE = "일식",
  WESTERN = "양식",
  SNACK = "분식",
  FASTFOOD = "치킨/피자/패스트푸드",
  SOUTHEAST_ASIAN = "동남아",
  INDIAN = "인도",
  MEXICAN = "멕시칸",
  MIDDLE_EASTERN = "중동",
  EUROPEAN = "유럽",
  NOODLE = "면요리",
  SOUTH_AMERICAN = "남미",
  AFRICAN = "아프리카",
  VEGAN = "채식/비건",
}

export interface Food {
  id: number;
  name: string;
  category: FoodCategory;
  price: number;
}

export interface FoodHistory {
  id: string;
  food: Food;
  selectedAt: string;
}

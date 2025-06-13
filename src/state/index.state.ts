import { MARKET_CATEGORIES } from "@/utils/consistant";

export interface HomeInitialState {
  selectedColorScheme: "light" | "dark";
  selectedCategory: string ;
  selectedSubCategory: string;
}

export const initialState: HomeInitialState = {
  selectedColorScheme: "dark",
  selectedCategory: MARKET_CATEGORIES[0].key,
  selectedSubCategory: "all"
};

import axios from "axios";
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponse,
  RecipeAPIResponseSchema,
} from "../utils/recipes-schema";
import { Drink, SearchFilter } from "../types/types";

export async function getCategories() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data } = await axios(`${apiUrl}/api/json/v1/1/list.php?c=list`);
  const result = CategoriesAPIResponseSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }
}

export async function getRecipes(filters: SearchFilter) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data } = await axios(
    `${apiUrl}/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
  );

  const response = DrinksAPIResponse.safeParse(data);

  if (response.success) {
    return response.data;
  }
}

export async function getRecipeById(id: Drink["idDrink"]) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data } = await axios(`${apiUrl}/api/json/v1/1/lookup.php?i=${id}`);

  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);

  if (result.success) {
    return result.data;
  }
}

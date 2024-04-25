import { StateCreator } from "zustand";
import { Recipe } from "../types/types";
import {
  NotificationSliceI,
  createNotificationSlice,
} from "./notificationSlice";

export interface FavoritesSliceI {
  favories: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
}

export const createFavoritesSlice: StateCreator<
  FavoritesSliceI & NotificationSliceI,
  [],
  [],
  FavoritesSliceI
> = (set, get, api) => ({
  favories: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favories: state.favories.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Se eliminó de favoritos",
        error: false,
      });
    } else {
      // set({
      //   favories: [...get().favories, recipe],
      // });

      // Otra solución
      set((state) => ({
        favories: [...state.favories, recipe],
      }));

      createNotificationSlice(set, get, api).showNotification({
        text: "Se agregó a favoritos",
        error: false,
      });
    }

    localStorage.setItem("favorites", JSON.stringify(get().favories));
  },
  favoriteExists: (id) => {
    return get().favories.some((favorite) => favorite.idDrink === id);
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        favories: JSON.parse(storedFavorites),
      });
    }
  },
});

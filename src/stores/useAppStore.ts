import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipesSliceI } from "./recipeSlice";
import { FavoritesSliceI, createFavoritesSlice } from "./favoritesSlice";
import {
  createNotificationSlice,
  NotificationSliceI,
} from "./notificationSlice";

export const useAppStore = create<
  RecipesSliceI & FavoritesSliceI & NotificationSliceI
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
  }))
);

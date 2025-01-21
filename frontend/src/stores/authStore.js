import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,

      login: (token) => set({ token: token, isAuthenticated: true }),

      logout: () => set({ token: null, isAuthenticated: false }),

      isTokenExpired: () => {
        const token = get().token;
        if (!token) return true;

        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;

        return tokenPayload.exp < currentTime;
      },
    }),
    {
      name: "auth",
    },
  ),
);

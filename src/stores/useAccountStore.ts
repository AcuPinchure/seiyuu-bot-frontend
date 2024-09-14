import type { LoginResponse } from "@/api/endPoints/auth";
import { create } from "zustand";
import { login, logout, testLogin } from "@/api/endPoints/auth";

export interface AccountStore {
  isLoading: {
    login: boolean;
    logout: boolean;
    testLogin: boolean;
  };
  user: LoginResponse["user"];
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  testLogin: () => Promise<void>;
}

const useAccountStore = create<AccountStore>((set, get) => ({
  isLoading: {
    login: false,
    logout: false,
    testLogin: false,
  },
  user: {
    id: 0,
    username: "",
    email: "",
  },
  login: async (username: string, password: string) => {
    set({ isLoading: { ...get().isLoading, login: true } });
    try {
      const response = await login(username, password);
      set({ user: response.user });
    } finally {
      set({ isLoading: { ...get().isLoading, login: false } });
    }
  },
  logout: async () => {
    set({ isLoading: { ...get().isLoading, logout: true } });
    try {
      await logout();
      set({ user: { id: 0, username: "", email: "" } });
    } finally {
      set({ isLoading: { ...get().isLoading, logout: false } });
    }
  },
  testLogin: async () => {
    set({ isLoading: { ...get().isLoading, testLogin: true } });
    try {
      const response = await testLogin();
      set({ user: response.user });
    } finally {
      set({ isLoading: { ...get().isLoading, testLogin: false } });
    }
  },
}));

export default useAccountStore;

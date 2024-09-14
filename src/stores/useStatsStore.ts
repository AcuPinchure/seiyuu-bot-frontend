import type { StatsResponse, FollowerResponse } from "@/api/endPoints/stats";
import { getStats, getFollowers } from "@/api/endPoints/stats";
import { create } from "zustand";

export interface StatsStore {
  isLoading: {
    stats: boolean;
    followers: boolean;
  };
  stats: StatsResponse;
  followers: FollowerResponse["data"];
  queryOptions: {
    seiyuuID: number;
    startDate: string;
    endDate: string;
  };
  getStats: () => Promise<void>;
  getFollowers: () => Promise<void>;
  setQueryOptions: (options: Partial<StatsStore["queryOptions"]>) => void;
}

const useStatsStore = create<StatsStore>((set, get) => ({
  isLoading: {
    stats: false,
    followers: false,
  },
  stats: {
    start_date: "2020-01-01T00:00:00Z",
    end_date: "2020-01-01T00:00:00Z",
    interval: 0,
    posts: 0,
    scheduled_interval: 0,
    actual_interval: 0,
    is_active: false,
    likes: 0,
    avg_likes: 0,
    max_likes: [],
    rts: 0,
    avg_rts: 0,
    max_rts: [],
  },
  followers: [],
  queryOptions: {
    seiyuuID: 2,
    startDate: new Date(
      new Date().getTime() - 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
    endDate: new Date().toISOString(),
  },
  getStats: async () => {
    set({ isLoading: { ...get().isLoading, stats: true } });
    try {
      const response = await getStats(
        get().queryOptions.seiyuuID,
        get().queryOptions.startDate,
        get().queryOptions.endDate
      );
      set({ stats: response });
    } finally {
      set({ isLoading: { ...get().isLoading, stats: false } });
    }
  },
  getFollowers: async () => {
    set({ isLoading: { ...get().isLoading, followers: true } });
    try {
      const response = await getFollowers(
        get().queryOptions.seiyuuID,
        get().queryOptions.startDate,
        get().queryOptions.endDate
      );
      console.log("response", response);
      set({ followers: response.data });
    } finally {
      set({ isLoading: { ...get().isLoading, followers: false } });
    }
  },
  setQueryOptions: (options) => {
    set({ queryOptions: { ...get().queryOptions, ...options } });
  },
}));

export default useStatsStore;

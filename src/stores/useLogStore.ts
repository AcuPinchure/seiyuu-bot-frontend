import type { LogListItem, LogDetailItem } from "@/api/endPoints/logs";
import { listLogs, getLogDetail } from "@/api/endPoints/logs";
import { create } from "zustand";

export interface LogStore {
  isLoading: {
    list: boolean;
    detail: boolean;
  };
  logState: {
    logType: "post" | "data";
    keyword?: string;
    minDate?: string;
    maxDate?: string;
    logList: LogListItem[];
  };
  activeID: string | null;
  logDetail: LogDetailItem | null;
  searchLogs: () => Promise<void>;
  setActiveID: (id: string) => Promise<void>;
  clearActiveID: () => void;
  setSearchParams: (params: Partial<Omit<LogStore["logState"], "logList">>) => void;
  fetchLogDetail: (id: string) => Promise<void>;
}

const useLogStore = create<LogStore>((set, get) => ({
  isLoading: {
    list: false,
    detail: false,
  },
  logState: {
    logType: "post",
    keyword: undefined,
    minDate: undefined,
    maxDate: undefined,
    logList: [],
  },
  activeID: null,
  logDetail: null,
  searchLogs: async () => {
    set({ isLoading: { ...get().isLoading, list: true } });
    try {
      const { logType, keyword, minDate, maxDate } = get().logState;
      const response = await listLogs(
        logType,
        keyword,
        minDate,
        maxDate
      );
      set({
        logState: {
          ...get().logState,
          logList: response,
        },
      });
    } finally {
      set({ isLoading: { ...get().isLoading, list: false } });
    }
  },
  setActiveID: async (id: string) => {
    set({ activeID: id });
    await get().fetchLogDetail(id);
  },
  clearActiveID: () => {
    set({ activeID: null, logDetail: null });
  },
  setSearchParams: (params) => {
    set({
      logState: {
        ...get().logState,
        ...params,
      },
    });
  },
  fetchLogDetail: async (id: string) => {
    set({ isLoading: { ...get().isLoading, detail: true } });
    try {
      const { logType } = get().logState;
      const response = await getLogDetail(logType, id);
      set({ logDetail: response });
    } finally {
      set({ isLoading: { ...get().isLoading, detail: false } });
    }
  },
}));

export default useLogStore;
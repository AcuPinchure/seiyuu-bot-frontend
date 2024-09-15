import type { StatusResponse } from "@/api/endPoints/status";
import { getStatus, updateStatus } from "@/api/endPoints/status";
import { enqueueSnackbar } from "notistack";
import { create } from "zustand";

export interface StatusStore {
  isLoading: {
    get: boolean;
    update: boolean;
  };
  status: StatusResponse["data"];
  getStatus: () => Promise<void>;
  updateStatus: (
    idName: string,
    activated: boolean,
    interval: number
  ) => Promise<void>;
}

const useStatusStore = create<StatusStore>((set, get) => ({
  isLoading: {
    get: false,
    update: false,
  },
  status: [],
  getStatus: async () => {
    set({
      isLoading: {
        ...get().isLoading,
        get: true,
      },
    });
    try {
      const response = await getStatus();
      set({ status: response.data });
    } finally {
      set({
        isLoading: {
          ...get().isLoading,
          get: false,
        },
      });
    }
  },
  updateStatus: async (idName, activated, interval) => {
    set({
      isLoading: {
        ...get().isLoading,
        update: true,
      },
    });
    try {
      const result = await updateStatus(idName, activated, interval);
      if (result.id === 0) {
        return;
      }
      enqueueSnackbar("Status Updated", { variant: "success" });
      set((state) => ({
        status: state.status.map((status) =>
          status.id === result.id ? result : status
        ),
      }));
    } finally {
      set({
        isLoading: {
          ...get().isLoading,
          update: false,
        },
      });
    }
  },
}));

export default useStatusStore;

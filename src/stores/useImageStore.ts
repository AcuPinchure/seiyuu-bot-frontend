import type {
  PaginatedImageResponse,
  ImageQueryOptions,
} from "@/api/endPoints/images";
import { GeneralResponse } from "@/api/endPoints/types";
import { getImages, updateImageWeight } from "@/api/endPoints/images";
import { create } from "zustand";

export interface InputImageQueryOptions {
  searchType: "stats" | "tweet";
  seiyuuIDName: string;
  startDate: string;
  endDate: string;
  minLikes: string;
  maxLikes: string;
  minRTs: string;
  maxRTs: string;
  minPosts: string;
  maxPosts: string;
  tweetID: string;
  page: number;
  orderBy: "date" | "likes" | "rts" | "posts"; // default: date
  order: "asc" | "desc"; // default: desc
}

export interface ImageStore {
  isLoading: {
    images: boolean;
    updateImageWeight: boolean;
  };
  images: GeneralResponse & PaginatedImageResponse;
  queryOptions: InputImageQueryOptions;
  getImages: () => Promise<void>;
  updateImageWeight: (imageID: number, newWeight: number) => Promise<void>;
  setQueryOptions: (newQueryOptions: Partial<InputImageQueryOptions>) => void;
}

const useImageStore = create<ImageStore>((set, get) => ({
  isLoading: {
    images: false,
    updateImageWeight: false,
  },
  images: {
    status: false,
    message: "Start browsing by applying filters.",
    data: [],
    count: 0,
    page: 1,
    total_pages: 1,
    sort_by: "date",
    order: "desc",
  },
  queryOptions: {
    searchType: "stats",
    seiyuuIDName: "",
    startDate: "",
    endDate: "",
    minLikes: "",
    maxLikes: "",
    minRTs: "",
    maxRTs: "",
    minPosts: "",
    maxPosts: "",
    tweetID: "",
    page: 1,
    orderBy: "date",
    order: "desc",
  },
  getImages: async () => {
    set({ isLoading: { ...get().isLoading, images: true } });

    const currQueryOptions = get().queryOptions;

    const fetchQueryOptions: ImageQueryOptions =
      currQueryOptions.searchType === "tweet"
        ? { tweetID: currQueryOptions.tweetID || undefined }
        : {
            seiyuuIDName: currQueryOptions.seiyuuIDName || undefined,
            startDate: currQueryOptions.startDate || undefined,
            endDate: currQueryOptions.endDate || undefined,
            minLikes: isNaN(parseInt(currQueryOptions.minLikes))
              ? undefined
              : parseInt(currQueryOptions.minLikes),
            maxLikes: isNaN(parseInt(currQueryOptions.maxLikes))
              ? undefined
              : parseInt(currQueryOptions.maxLikes),
            minRTs: isNaN(parseInt(currQueryOptions.minRTs))
              ? undefined
              : parseInt(currQueryOptions.minRTs),
            maxRTs: isNaN(parseInt(currQueryOptions.maxRTs))
              ? undefined
              : parseInt(currQueryOptions.maxRTs),
            minPosts: isNaN(parseInt(currQueryOptions.minPosts))
              ? undefined
              : parseInt(currQueryOptions.minPosts),
            maxPosts: isNaN(parseInt(currQueryOptions.maxPosts))
              ? undefined
              : parseInt(currQueryOptions.maxPosts),
            page: currQueryOptions.page || undefined,
            orderBy: currQueryOptions.orderBy || undefined,
            order: currQueryOptions.order || undefined,
          };

    try {
      const response = await getImages(fetchQueryOptions);
      set({ images: response });
    } finally {
      set({ isLoading: { ...get().isLoading, images: false } });
    }
  },
  updateImageWeight: async (imageID, newWeight) => {
    set({ isLoading: { ...get().isLoading, updateImageWeight: true } });
    try {
      const updatedData = await updateImageWeight(imageID, newWeight);

      const updatedImages = get().images.data.map((image) =>
        image.id === imageID ? updatedData : image
      );
      set({
        images: {
          ...get().images,
          data: updatedImages,
        },
      });
    } finally {
      set({ isLoading: { ...get().isLoading, updateImageWeight: false } });
    }
  },
  setQueryOptions: (newQueryOptions) => {
    set({ queryOptions: { ...get().queryOptions, ...newQueryOptions } });
  },
}));

export default useImageStore;

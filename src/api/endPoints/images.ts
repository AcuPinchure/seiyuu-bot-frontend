import { AxiosError } from "axios";
import axiosErrorHandler from "../axiosErrorHandler";
import baseRequest from "../axiosInstance";
import { GeneralResponse } from "./types";

export interface PaginatedImageResponse {
  count: number;
  total_pages: number;
  sort_by: "date" | "likes" | "rts" | "posts";
  order: "asc" | "desc";
  page: number;
  data: {
    id: number;
    file_path: string;
    file_type: "image/jpg" | "image/png" | "gif/gif" | "video/mp4";
    weight: number;
    total_weight: number;
    seiyuu_name: string;
    seiyuu_screen_name: string;
    seiyuu_id_name: string;
    posts: number;
    likes: number;
    rts: number;
  }[];
}

export interface ImageQueryOptions {
  seiyuuIDName?: string;
  startDate?: string;
  endDate?: string;
  minLikes?: number;
  maxLikes?: number;
  minRTs?: number;
  maxRTs?: number;
  minPost?: number;
  maxPost?: number;
  tweetID?: string;
  page?: number;
  orderBy?: "date" | "likes" | "rts" | "posts"; // default: date
  order?: "asc" | "desc"; // default: desc
}

export interface ImageTweetResponse {
  data: {
    id: string;
    post_time: string;
    data_time: string;
    like: number;
    rt: number;
    reply: number;
    quote: number;
    followers: number;
  }[];
}

export async function getImages(
  queryOptions: ImageQueryOptions
): Promise<GeneralResponse & PaginatedImageResponse> {
  const ERROR_RESPONSE: GeneralResponse & PaginatedImageResponse = {
    status: false,
    message: "No images found. Try clearing some filters.",
    count: 0,
    total_pages: 1,
    sort_by: "date",
    order: "desc",
    page: 1,
    data: [],
  };

  try {
    const response = await baseRequest.get<
      GeneralResponse & PaginatedImageResponse
    >(`/core/images/`, {
      params: {
        seiyuu_id_name: queryOptions.seiyuuIDName,
        start_date: queryOptions.startDate,
        end_date: queryOptions.endDate,
        min_likes: queryOptions.minLikes,
        max_likes: queryOptions.maxLikes,
        min_rts: queryOptions.minRTs,
        max_rts: queryOptions.maxRTs,
        min_post: queryOptions.minPost,
        max_post: queryOptions.maxPost,
        tweet_id: queryOptions.tweetID,
        page: queryOptions.page,
        sort_by: queryOptions.orderBy,
        order: queryOptions.order,
      },
    });

    if (response.data && !response.data.status) {
      return ERROR_RESPONSE;
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      axiosErrorHandler(error, "Loading Images Failed");
    } else {
      // Handle errors thrown from backend
      console.error(error);
    }
    return ERROR_RESPONSE;
  }
}

export async function getImageTweet(
  imageID: number
): Promise<ImageTweetResponse["data"]> {
  const ERROR_RESPONSE: ImageTweetResponse["data"] = [];

  try {
    const response = await baseRequest.get<
      GeneralResponse & ImageTweetResponse
    >(`/core/images/${imageID}/tweets/`);

    if (response.data && !response.data.status) {
      return ERROR_RESPONSE;
    }

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      axiosErrorHandler(error, "Loading Image Tweet Failed");
    } else {
      // Handle errors thrown from backend
      console.error(error);
    }
    return ERROR_RESPONSE;
  }
}

export async function updateImageWeight(
  imageID: number,
  newWeight: number
): Promise<PaginatedImageResponse["data"][0]> {
  const ERROR_RESPONSE: PaginatedImageResponse["data"][0] = {
    id: 0,
    file_path: "",
    file_type: "image/jpg",
    weight: 0,
    total_weight: 0,
    seiyuu_name: "",
    seiyuu_screen_name: "",
    seiyuu_id_name: "",
    posts: 0,
    likes: 0,
    rts: 0,
  };

  try {
    const response = await baseRequest.patch<
      GeneralResponse & {
        data: PaginatedImageResponse["data"][0];
      }
    >(`/core/images/update/${imageID}/`, {
      weight: newWeight,
    });

    if (response.data && !response.data.status) {
      return ERROR_RESPONSE;
    }

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      axiosErrorHandler(error, "Updating Image Weight Failed");
    } else {
      // Handle errors thrown from backend
      console.error(error);
    }
    return ERROR_RESPONSE;
  }
}

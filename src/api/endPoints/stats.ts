import { AxiosError } from "axios";
import axiosErrorHandler from "../axiosErrorHandler";
import baseRequest from "../axiosInstance";
import { GeneralResponse } from "./types";

export interface StatsResponse {
  start_date: string;
  end_date: string;
  interval: number;
  posts: number;
  scheduled_interval: number;
  actual_interval: number;
  is_active: boolean;
  likes: number;
  avg_likes: number;
  max_likes: string[];
  rts: number;
  avg_rts: number;
  max_rts: string[];
}

export interface FollowerResponse {
  data: {
    data_time: string;
    followers: number;
  }[];
}

export async function getStats(
  seiyuuID: number,
  startDate: string,
  endDate: string
): Promise<StatsResponse> {
  const ERROR_RESPONSE = {
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
  };

  try {
    const response = await baseRequest.get<GeneralResponse & StatsResponse>(
      "/core/stats/",
      {
        params: {
          seiyuu: seiyuuID.toString(),
          start_date: startDate,
          end_date: endDate,
        },
      }
    );
    if (!response.data?.status) {
      return ERROR_RESPONSE;
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      axiosErrorHandler(error, "Loading Stats Failed");
    } else {
      // Handle errors thrown from backend
      console.error(error);
    }
    return ERROR_RESPONSE;
  }
}

export async function getFollowers(
  seiyuuID: number,
  startDate: string,
  endDate: string
): Promise<FollowerResponse> {
  try {
    const response = await baseRequest.get<GeneralResponse & FollowerResponse>(
      "/core/followers/",
      {
        params: {
          seiyuu: seiyuuID.toString(),
          start_date: startDate,
          end_date: endDate,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      axiosErrorHandler(error, "Loading Followers Failed");
    } else {
      // Handle errors thrown from backend
      console.error(error);
    }
    return { data: [] };
  }
}

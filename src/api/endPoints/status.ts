import { AxiosError } from "axios";
import axiosErrorHandler from "../axiosErrorHandler";
import baseRequest from "../axiosInstance";
import { GeneralResponse } from "./types";

export interface StatusResponse {
  data: {
    id: number;
    name: string;
    screen_name: string;
    id_name: string;
    activated: boolean;
    interval: number;
    last_post: string;
  }[];
}

export async function getStatus(): Promise<StatusResponse> {
  const ERROR_RESPONSE = {
    data: [],
  };

  try {
    const response = await baseRequest.get<GeneralResponse & StatusResponse>(
      "/core/service_config/"
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      axiosErrorHandler(error, "Loading Status Failed");
    } else {
      // Handle errors thrown from backend
      console.error(error);
    }
    return ERROR_RESPONSE;
  }
}

export async function updateStatus(
  idName: string,
  activated: boolean,
  interval: number
): Promise<StatusResponse["data"][0]> {
  const ERROR_RESPONSE = {
    id: 0,
    name: "",
    screen_name: "",
    id_name: "",
    activated: false,
    interval: 0,
    last_post: "2020-01-01T00:00:00Z",
  };

  try {
    const response = await baseRequest.patch<
      GeneralResponse & {
        data: StatusResponse["data"][0];
      }
    >(`/core/service_config/update/${idName}/`, {
      activated: activated,
      interval: interval,
    });
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      axiosErrorHandler(error, "Updating Status Failed");
    } else {
      // Handle errors thrown from backend
      console.error(error);
    }
    return ERROR_RESPONSE;
  }
}

import { AxiosError } from "axios";
import axiosErrorHandler from "../axiosErrorHandler";
import baseRequest from "../axiosInstance";
import { GeneralResponse } from "./types";

export interface LogResponse {
  list_dir: string[];
  log: string;
}

export async function getBackendLogFilesOrDirs(
  type: "backend" | "crawler",
  path: string
): Promise<GeneralResponse & LogResponse> {
  const ERROR_RESPONSE: GeneralResponse & LogResponse = {
    status: false,
    message: "Fetch Log Files Failed",
    list_dir: [],
    log: "",
  };

  try {
    const response = await baseRequest.get<GeneralResponse & LogResponse>(
      `/logs/${type}${path || "//"}`
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      axiosErrorHandler(error, "Loading Files Failed");
    } else {
      // Handle errors thrown from backend
      console.error(error);
    }
    return ERROR_RESPONSE;
  }
}

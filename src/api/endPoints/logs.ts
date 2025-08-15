import { AxiosError } from "axios";
import axiosErrorHandler from "../axiosErrorHandler";
import baseRequest from "../axiosInstance";
import { GeneralResponse } from "./types";

export interface LogResponse {
  list_dir: string[];
  log: string;
}

export interface LogItem {
  id: string;
  type: "post" | "data";
  log_time: string;
  file_name: string;
}

export interface LogListItem extends LogItem {
  preview: string;
}

export interface LogDetailItem extends LogItem {
  content: string;
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

export async function listLogs(
  type: "post" | "data",
  keyword?: string,
  min_date?: string,
  max_date?: string,
  page?: number
): Promise<LogListItem[]> {
  const ERROR_RESPONSE: LogListItem[] = [];

  try {
    const response = await baseRequest.get<LogListItem[]>(`/logs/list/`, {
      params: {
        type,
        keyword,
        min_date,
        max_date,
        page,
      },
    });

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

export async function getLogDetail(
  type: "post" | "data",
  id: string
): Promise<LogDetailItem> {
  const ERROR_RESPONSE: LogDetailItem = {
    type: type,
    id: "",
    log_time: "",
    file_name: "",
    content: "",
  };

  try {
    const response = await baseRequest.get<GeneralResponse & LogDetailItem>(
      `/logs/get/${id}/`,
      {
        params: {
          type,
        },
      }
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

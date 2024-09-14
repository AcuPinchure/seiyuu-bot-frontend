import { AxiosError } from "axios";
import axiosErrorHandler from "../axiosErrorHandler";
import baseRequest from "../axiosInstance";
import { GeneralResponse } from "./types";

export interface LoginResponse {
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await baseRequest.post<GeneralResponse & LoginResponse>(
      "/account/login/",
      {
        username,
        password,
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      axiosErrorHandler(error, "Login Failed");
    } else {
      // Handle errors thrown from backend
      console.error(error);
    }
    return {
      user: {
        id: 0,
        username: "",
        email: "",
      },
    };
  }
}

export async function logout(): Promise<void> {
  try {
    await baseRequest.post("/account/logout/");
  } catch (error) {
    if (error instanceof AxiosError) {
      axiosErrorHandler(error, "Logout Failed");
    } else {
      // Handle errors thrown from backend
      console.error(error);
    }
  }
}

export async function testLogin(): Promise<LoginResponse> {
  try {
    const response = await baseRequest.get<GeneralResponse & LoginResponse>(
      "/account/test_login/"
    );
    return {
      user: response.data.user,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return {
          user: {
            id: 0,
            username: "",
            email: "",
          },
        };
      }
      axiosErrorHandler(error, "Test Login Failed");
    } else {
      // Handle errors thrown from backend
      console.error(error);
    }
    return {
      user: {
        id: 0,
        username: "",
        email: "",
      },
    };
  }
}

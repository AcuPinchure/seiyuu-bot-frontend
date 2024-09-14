import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

interface ErrorTextCase {
  400: string;
  401: string;
  403: string;
  404: string;
}

export default function axiosErrorHandler(
  error: AxiosError,
  baseMessage: string,
  errorTextCase: ErrorTextCase = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
  }
): void {
  let errorMessage: string = baseMessage;

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    switch (error.response.status) {
      case 400:
        errorMessage += ": " + errorTextCase[400];
        break;
      case 401:
        errorMessage += ": " + errorTextCase[401];
        break;
      case 403:
        errorMessage += ": " + errorTextCase[403];
        break;
      case 404:
        errorMessage += ": " + errorTextCase[404];
        break;
      case 500:
        errorMessage += ": Internal server error";
        break;
      default:
        errorMessage += `: HTTP ${error.response.status}`;
        break;
    }
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    errorMessage += ": The request was made but no response was received";
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage +=
      ": Something happened in setting up the request that triggered an Error";
    console.log(error.message);
  }
  console.log(error.config);
  console.error(errorMessage);
  enqueueSnackbar(errorMessage, { variant: "error" });
}

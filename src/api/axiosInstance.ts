import axios from "axios";
import { setupCache, buildWebStorage } from "axios-cache-interceptor";

const BASE_URL = import.meta.env.VITE_API_URL;

const baseRequest = setupCache(
  axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  }),
  {
    methods: ["get"],
    ttl: 10 * 60 * 1000,
    storage: buildWebStorage(sessionStorage, "axios-cache:"),
  }
);

function clearAxiosCache() {
  let i = 0;
  while (sessionStorage.key(i) !== null) {
    if (sessionStorage.key(i)?.startsWith("axios-cache:")) {
      sessionStorage.removeItem(sessionStorage.key(0) || "");
    } else {
      i++;
    }
  }
}

export default baseRequest;
export { BASE_URL, clearAxiosCache };

import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const BASE_URL = import.meta.env.VITE_API_URL;

const baseRequest = setupCache(
  axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  }),
  {
    methods: ["get"],
    ttl: 10 * 60 * 1000,
  }
);

export default baseRequest;
export { BASE_URL };

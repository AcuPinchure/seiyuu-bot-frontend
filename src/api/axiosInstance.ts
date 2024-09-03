import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const baseRequest = setupCache(
  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  }),
  {
    methods: ["get"],
    ttl: 10 * 60 * 1000,
  }
);

export default baseRequest;

import axios from "axios";
import { cookie } from "@/utils/auth";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const accessToken = cookie.get("access_token");
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

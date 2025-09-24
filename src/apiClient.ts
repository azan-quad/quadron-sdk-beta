import axios from "axios";
import { getSDKConfig } from "./index";

export function getApiClient() {
  const config = getSDKConfig();
  if (!config || !config.API_BASE_URL) {
    throw new Error("API_BASE_URL is not set. Please initialize the SDK first.");
  }

  let headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (config.isClient) {
    if (!config.ACCESS_TOKEN) {
      throw new Error("ACCESS_TOKEN is required in client mode");
    }
    headers["Authorization"] = `Bearer ${config.ACCESS_TOKEN}`;
  } else {
    if (!config.API_KEY) {
      throw new Error("API_KEY is required in server mode");
    }
    headers["x-api-key"] = config.API_KEY;
  }

  return axios.create({
    baseURL: config.API_BASE_URL,
    headers,
  });
}

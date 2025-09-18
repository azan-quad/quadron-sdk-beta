import axios from "axios";
import { getSDKConfig } from "./index";

export function getApiClient() {
  const config = getSDKConfig();
  if (!config || !config.API_BASE_URL) {
    throw new Error("API_BASE_URL is not set. Please initialize the SDK first.");
  }
  return axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(config.API_KEY ? { "x-api-key": config.API_KEY } : {}),
      ...(config.COGNITO_JWT ? { Authorization: `Bearer ${config.COGNITO_JWT}` } : {}),
    },
  });
}

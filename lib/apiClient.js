"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiClient = getApiClient;
const axios_1 = __importDefault(require("axios"));
const index_1 = require("./index");
function getApiClient() {
    const config = (0, index_1.getSDKConfig)();
    if (!config || !config.API_BASE_URL) {
        throw new Error("API_BASE_URL is not set. Please initialize the SDK first.");
    }
    let headers = {
        "Content-Type": "application/json",
    };
    if (config.isClient) {
        if (!config.ACCESS_TOKEN) {
            throw new Error("ACCESS_TOKEN is required in client mode");
        }
        headers["Authorization"] = `Bearer ${config.ACCESS_TOKEN}`;
    }
    else {
        if (!config.API_KEY) {
            throw new Error("API_KEY is required in server mode");
        }
        headers["x-api-key"] = config.API_KEY;
    }
    return axios_1.default.create({
        baseURL: config.API_BASE_URL,
        headers,
    });
}

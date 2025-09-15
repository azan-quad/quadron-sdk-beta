"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminConfig = exports.ContractAddresses = exports.sepoliaProvider = exports.solanaConnection = exports.kms = void 0;
const client_kms_1 = require("@aws-sdk/client-kms");
const web3_js_1 = require("@solana/web3.js");
const dotenv_1 = __importDefault(require("dotenv"));
const ethers_1 = require("ethers");
dotenv_1.default.config();
exports.kms = new client_kms_1.KMSClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.KMS_ACCESS_KEY || '',
        secretAccessKey: process.env.KMS_SECRET_KEY || '',
    },
});
exports.solanaConnection = new web3_js_1.Connection(process.env.SOLANA_URL || 'https://api.devnet.solana.com');
exports.sepoliaProvider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY');
exports.ContractAddresses = {
    sbt: {
        sepolia: "0x09F2B7e7e9EebcC97C147BbF6c56cdeb9F8b36b8",
        ethereum: "0x09G2B7y8e9ExsaC90C147BbF6c56cdeb9L8r38y7",
    },
};
exports.AdminConfig = {
    privateKey: process.env.ADMIN_PRIVATE_KEY || "",
    network: process.env.NETWORK || "sepolia",
};

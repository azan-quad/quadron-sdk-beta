"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminSigner = getAdminSigner;
exports.getSbtContract = getSbtContract;
const ethers_1 = require("ethers");
const config_1 = require("../config");
const quadronSBT_json_1 = __importDefault(require("./quadronSBT.json"));
function getAdminSigner() {
    if (!config_1.AdminConfig.privateKey) {
        throw new Error("Admin private key not set in AdminConfig");
    }
    return new ethers_1.ethers.Wallet(config_1.AdminConfig.privateKey, config_1.sepoliaProvider);
}
function getSbtContract(network, signerOrProvider) {
    const address = config_1.ContractAddresses.sbt[network];
    if (!address) {
        throw new Error(`SBT contract not deployed on ${network}`);
    }
    const providerOrSigner = signerOrProvider || getAdminSigner();
    return new ethers_1.ethers.Contract(address, quadronSBT_json_1.default, providerOrSigner);
}

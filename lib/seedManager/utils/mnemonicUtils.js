"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSeedAndKeys = generateSeedAndKeys;
exports.deriveKeysFromMnemonic = deriveKeysFromMnemonic;
const bip39 = __importStar(require("bip39"));
const ethereumjs_wallet_1 = require("ethereumjs-wallet");
const ed25519_hd_key_1 = require("ed25519-hd-key");
const bs58_1 = __importDefault(require("bs58"));
async function generateSeedAndKeys() {
    const mnemonic = bip39.generateMnemonic();
    return { mnemonic };
}
function isValidBIP32Path(path) {
    return /^m(\/\d+'?)+$/.test(path);
}
async function deriveKeysFromMnemonic(mnemonic, paths) {
    if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error("Invalid mnemonic");
    }
    const { ethPath, solanaPath } = paths;
    if (!isValidBIP32Path(ethPath)) {
        throw new Error(`Invalid Ethereum derivation path: ${ethPath}`);
    }
    if (!isValidBIP32Path(solanaPath)) {
        throw new Error(`Invalid Solana derivation path: ${solanaPath}`);
    }
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const ethHdWallet = ethereumjs_wallet_1.hdkey.fromMasterSeed(seed);
    const ethChild = ethHdWallet.derivePath(ethPath);
    const ethWallet = ethChild.getWallet();
    const ethPrivateKey = ethWallet.getPrivateKey().toString("hex");
    const ethAddress = ethWallet.getAddress().toString("hex");
    const solDerived = (0, ed25519_hd_key_1.derivePath)(solanaPath, seed.toString("hex"));
    const solPrivateKey = Buffer.from(solDerived.key);
    const solEncodedPrivateKey = bs58_1.default.encode(solPrivateKey);
    return {
        eth: {
            privateKey: ethPrivateKey,
            address: "0x" + ethAddress,
            derivationPath: ethPath,
        },
        solana: {
            privateKey: solPrivateKey.toString("hex"),
            encodedPrivateKey: solEncodedPrivateKey,
            derivationPath: solanaPath,
        },
    };
}

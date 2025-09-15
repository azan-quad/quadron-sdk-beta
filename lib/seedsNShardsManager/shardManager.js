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
exports.OneShardManager = void 0;
const bip39 = __importStar(require("bip39"));
const secrets_js_grempe_1 = __importDefault(require("secrets.js-grempe"));
class OneShardManager {
    static generateMnemonic(strength = 128) {
        return bip39.generateMnemonic(strength);
    }
    static createShards(mnemonic, total = 3, threshold = 2) {
        const hex = secrets_js_grempe_1.default.str2hex(mnemonic);
        return secrets_js_grempe_1.default.share(hex, total, threshold);
    }
    static recoverMnemonic(shards) {
        if (shards.length < 2) {
            throw new Error('At least 2 shards required to recover mnemonic');
        }
        const combinedHex = secrets_js_grempe_1.default.combine(shards);
        const mnemonic = secrets_js_grempe_1.default.hex2str(combinedHex);
        if (!bip39.validateMnemonic(mnemonic)) {
            throw new Error('Recovered mnemonic is invalid');
        }
        return mnemonic;
    }
    static validateMnemonic(mnemonic) {
        return bip39.validateMnemonic(mnemonic);
    }
}
exports.OneShardManager = OneShardManager;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEthereumWallet = generateEthereumWallet;
const ethers_1 = require("ethers");
function generateEthereumWallet(mnemonic) {
    const wallet = ethers_1.ethers.Wallet.fromMnemonic(mnemonic);
    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
    };
}

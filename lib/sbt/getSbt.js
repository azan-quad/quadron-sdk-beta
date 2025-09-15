"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasSbt = hasSbt;
exports.totalSupply = totalSupply;
const sbtUtils_1 = require("./sbtUtils");
async function hasSbt(network, address) {
    const contract = (0, sbtUtils_1.getSbtContract)(network);
    const balance = await contract.balanceOf(address);
    return balance.toNumber() > 0;
}
async function totalSupply(network) {
    const contract = (0, sbtUtils_1.getSbtContract)(network);
    const total = await contract.totalSupply();
    return total.toNumber();
}

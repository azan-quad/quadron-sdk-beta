"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeSbt = revokeSbt;
const sbtUtils_1 = require("./sbtUtils");
async function revokeSbt(network, tokenId) {
    const contract = (0, sbtUtils_1.getSbtContract)(network);
    const tx = await contract.revoke(tokenId);
    await tx.wait();
}

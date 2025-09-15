"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintSbt = mintSbt;
const sbtUtils_1 = require("./sbtUtils");
async function mintSbt(network, userAddress) {
    var _a, _b;
    const contract = (0, sbtUtils_1.getSbtContract)(network);
    const tx = await contract.mintSBT(userAddress);
    const receipt = await tx.wait();
    const event = (_a = receipt.events) === null || _a === void 0 ? void 0 : _a.find((e) => e.event === "SBTMinted");
    if (!event)
        throw new Error("SBTMinted event not found in tx receipt");
    return (_b = event.args) === null || _b === void 0 ? void 0 : _b.tokenId.toNumber();
}

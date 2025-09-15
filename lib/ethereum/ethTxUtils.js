"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evmTxUtils = void 0;
const ethers_1 = require("ethers");
class evmTxUtils {
    constructor(rpcUrl) {
        this.rpcUrl = rpcUrl;
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
    }
    async buildTransaction(params) {
        var _a, _b, _c, _d;
        const { from, to, value, tokenAddress } = params;
        if (!ethers_1.ethers.utils.isAddress(from))
            throw new Error("Invalid sender address");
        if (!ethers_1.ethers.utils.isAddress(to))
            throw new Error("Invalid recipient address");
        const chainId = (await this.provider.getNetwork()).chainId;
        const nonce = await this.provider.getTransactionCount(from);
        const feeData = await this.provider.getFeeData();
        if (!tokenAddress || tokenAddress === ethers_1.ethers.constants.AddressZero) {
            const gasLimit = await this.provider.estimateGas({ from, to, value });
            return {
                from,
                to,
                value,
                nonce,
                gasLimit,
                maxFeePerGas: (_a = feeData.maxFeePerGas) !== null && _a !== void 0 ? _a : undefined,
                maxPriorityFeePerGas: (_b = feeData.maxPriorityFeePerGas) !== null && _b !== void 0 ? _b : undefined,
                chainId,
                type: 2,
            };
        }
        else {
            if (!ethers_1.ethers.utils.isAddress(tokenAddress))
                throw new Error("Invalid ERC20 token address");
            const ERC20_ABI = ["function transfer(address to, uint256 value) returns (bool)"];
            const contract = new ethers_1.ethers.Contract(tokenAddress, ERC20_ABI, this.provider);
            const data = contract.interface.encodeFunctionData("transfer", [to, value]);
            const gasLimit = await this.provider.estimateGas({ from, to: tokenAddress, data });
            return {
                from,
                to: tokenAddress,
                data,
                nonce,
                gasLimit,
                maxFeePerGas: (_c = feeData.maxFeePerGas) !== null && _c !== void 0 ? _c : undefined,
                maxPriorityFeePerGas: (_d = feeData.maxPriorityFeePerGas) !== null && _d !== void 0 ? _d : undefined,
                chainId,
                type: 2,
            };
        }
    }
    async signTransaction(privateKey, tx) {
        var _a, _b, _c, _d;
        const wallet = new ethers_1.ethers.Wallet(privateKey, this.provider);
        if (!tx.nonce)
            tx.nonce = await this.provider.getTransactionCount(wallet.address);
        if (!tx.gasLimit)
            tx.gasLimit = await this.provider.estimateGas(Object.assign(Object.assign({}, tx), { from: wallet.address }));
        if (!tx.maxFeePerGas || !tx.maxPriorityFeePerGas) {
            const feeData = await this.provider.getFeeData();
            (_a = tx.maxFeePerGas) !== null && _a !== void 0 ? _a : (tx.maxFeePerGas = (_b = feeData.maxFeePerGas) !== null && _b !== void 0 ? _b : undefined);
            (_c = tx.maxPriorityFeePerGas) !== null && _c !== void 0 ? _c : (tx.maxPriorityFeePerGas = (_d = feeData.maxPriorityFeePerGas) !== null && _d !== void 0 ? _d : undefined);
        }
        if (!tx.chainId)
            tx.chainId = (await this.provider.getNetwork()).chainId;
        const signedTx = await wallet.signTransaction(tx);
        return {
            signedTx,
            transaction: tx,
        };
    }
    async sendSignedTransaction(signedTx) {
        const response = await this.provider.sendTransaction(signedTx);
        await response.wait();
        return response.hash;
    }
    toWei(amount) {
        return ethers_1.ethers.utils.parseEther(amount);
    }
    async toTokenUnits(amount, tokenAddress) {
        const ERC20_ABI = ["function decimals() view returns (uint8)"];
        const contract = new ethers_1.ethers.Contract(tokenAddress, ERC20_ABI, this.provider);
        const decimals = await contract.decimals();
        return ethers_1.ethers.utils.parseUnits(amount, decimals);
    }
}
exports.evmTxUtils = evmTxUtils;

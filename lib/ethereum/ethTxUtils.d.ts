import { ethers, BigNumber } from "ethers";
export interface NormalizedTxParams {
    from: string;
    to: string;
    value: BigNumber;
    tokenAddress?: string;
}
export interface SignedTransactionResult {
    signedTx: string;
    transaction: ethers.providers.TransactionRequest;
}
export declare class evmTxUtils {
    private rpcUrl;
    private provider;
    constructor(rpcUrl: string);
    buildTransaction(params: NormalizedTxParams): Promise<ethers.providers.TransactionRequest>;
    signTransaction(privateKey: string, tx: ethers.providers.TransactionRequest): Promise<SignedTransactionResult>;
    sendSignedTransaction(signedTx: string): Promise<string>;
    toWei(amount: string): BigNumber;
    toTokenUnits(amount: string, tokenAddress: string): Promise<BigNumber>;
}

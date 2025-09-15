import { EthereumWalletRecord } from "./createWallet";
export declare function recoverEthereumWallet(walletRecord: EthereumWalletRecord): Promise<{
    address: string;
    privateKey: string;
}>;

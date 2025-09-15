import { KMSClient } from '@aws-sdk/client-kms';
import { Connection } from '@solana/web3.js';
import { ethers } from 'ethers';
export declare const kms: KMSClient;
export declare const solanaConnection: Connection;
export declare const sepoliaProvider: ethers.providers.JsonRpcProvider;
export declare const ContractAddresses: {
    sbt: {
        sepolia: string;
        ethereum: string;
    };
};
export declare const AdminConfig: {
    privateKey: string;
    network: string;
};

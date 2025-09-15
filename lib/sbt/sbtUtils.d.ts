import { ethers } from "ethers";
import { ContractAddresses } from "../config";
export declare function getAdminSigner(): ethers.Wallet;
export declare function getSbtContract(network: keyof typeof ContractAddresses["sbt"], signerOrProvider?: ethers.Signer | ethers.providers.Provider): ethers.Contract;

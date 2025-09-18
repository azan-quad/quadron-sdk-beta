export interface QuadronSDKConfig {
  API_BASE_URL: string;
  isClient: boolean;
  COGNITO_JWT?: string;
  API_KEY?: string;
};

export interface GetWalletRes {
  cognitoSub: string;
  publicAddress: string;
  smartWalletAddress: string;
  isSmartWalletDeployed: boolean;
  revoked: boolean;
};

export interface CreateWalletReq { withSmartWallet: boolean };
export interface CreateWalletRes {
  publicAddress: string;
  smartWalletAddress: string;
};

export interface RecoverWalletRes {
  address: string;
  privateKey: string;
  mnemonic: string;
};

export interface CreateSmartWalletForExistingRes {
  publicAddress: string;
  smartWalletAddress: string;
};

export interface CreateWalletAndMintSbtReq {
  withSmartWallet: boolean;
  mintSBT: boolean;
  name?: string;
  description?: string;
  image?: string;
  attributes?: string[];
};

export interface CreateWalletAndMintSbtRes {
  wallet: {
    publicAddress: string;
    smartWalletAddress: string;
  }| null;
  mintedToken: MintSbtRes | null | undefined;
};

export interface GetSbtMetadataRes {
  tokenId: number;
  name?: string;
  description?: string;
  image?: string;
  attributes?: string[];
};

export interface RevokeSbtReq { cognitoSub: string };

export interface MintSbtReq {
  name?: string;
  description?: string;
  image?: string;
  attributes?: string[];
};

export interface MintSbtRes {
  tokenId: number;
  owner: string;
  metadata: any;
};

export interface UpdateSbtMetadataReq {
  cognitoSub: string;
  name?: string;
  description?: string;
  image?: string;
  attributes?: string[];
};

export interface UpdateSbtMetadataRes {
  tokenId: number;
  name?: string;
  description?: string;
  image?: string;
  attributes?: string[];
};

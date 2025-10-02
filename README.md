# Quadron SDK Reference

A unified SDK for managing **wallets** and **soulbound tokens (SBTs)** across frontend (client) and backend (server) environments.

- **Client SDK** → Authenticated with **Bearer Access Token** (from Cognito/Keycloak).
- **Server SDK** → Authenticated with **API Key** (secure backend integration).

---

## Installation

```bash
npm install quadron-sdk-beta
```

---

## Quick Start

```ts
import { initSDK, updateAccessToken } from "quadron-sdk-beta";

// Frontend (client mode)
const quadron = initSDK({
  API_BASE_URL: "<API_URL>",
  isClient: true,
  ACCESS_TOKEN: "<JWT_ACCESS_TOKEN>",
});

// Backend (server mode)
const quadronServer = initSDK({
  API_BASE_URL: "<API_URL>",
  isClient: false,
  API_KEY: "<API_KEY>",
});

// Refresh token dynamically (client)
updateAccessToken("<NEW_ACCESS_TOKEN>");
```

---

## Function Reference

| Function                                   | Module  | Mode   | Auth Required | Backend Route             |
| ------------------------------------------ | ------- | ------ | ------------- | ------------------------- |
| `wallets.get()`                            | Wallets | Client | Bearer Token  | `GET /wallet/`            |
| `wallets.getBySub({ userSub })`            | Wallets | Server | API Key       | `POST /wallet/getbysub`   |
| `wallets.create({ withSmartWallet })`      | Wallets | Client | Bearer Token  | `POST /wallet/create`     |
| `wallets.recover()`                        | Wallets | Client | Bearer Token  | `POST /wallet/recover`    |
| `wallets.createSmartWallet()`              | Wallets | Client | Bearer Token  | `POST /wallet/smart`      |
| `wallets.revoke({ userSub })`              | Wallets | Server | API Key       | `POST /wallet/revoke`     |
| `sbt.mint({ userSub })`                    | SBT     | Server | API Key       | `POST /sbt/mint`          |
| `sbt.revoke({ userSub })`                  | SBT     | Server | API Key       | `POST /sbt/revoke`        |
| `sbt.getMySbt()`                           | SBT     | Client | Bearer Token  | `GET /sbt/me`             |
| `sbt.getSbtBySub(userSub)`                 | SBT     | Server | API Key       | `POST /sbt/user`          |
| `sbt.updateMetadata({ userSub, updates })` | SBT     | Server | API Key       | `PATCH /sbt/update`       |
| `sbt.getPublicMetadata(tokenId)`           | SBT     | Public | None          | `GET /sbt/token/:tokenId` |

---

## Wallet Examples

### Client

```ts
// Get authenticated user wallet
await quadron.wallets.get();

// Create wallet
await quadron.wallets.create({ withSmartWallet: true });

// Recover wallet (returns mnemonic + private key)
await quadron.wallets.recover();

// Attach smart wallet (gasless)
await quadron.wallets.createSmartWallet();
```

### Server

```ts
// Get wallet by userSub
await quadronServer.wallets.getBySub({ userSub: "user-123" });

// Revoke wallet
await quadronServer.wallets.revoke({ userSub: "user-123" });
```

---

## SBT Examples

### Client

```ts
// Get my SBT
await quadron.sbt.getMySbt();

// Get public SBT metadata
await quadron.sbt.getPublicMetadata(1234);
```

### Server

```ts
// Mint SBT
await quadronServer.sbt.mint({ userSub: "user-123" });

// Revoke SBT
await quadronServer.sbt.revoke({ userSub: "user-123" });

// Update SBT metadata
await quadronServer.sbt.updateMetadata({
  userSub: "user-123",
  updates: {
    reputationScore: 100,
    badges: ["early-adopter"],
    quadronRole: "developer",
    contributions: 5,
    reviews: 2,
  },
});

// Get SBT by userSub
await quadronServer.sbt.getSbtBySub("user-123");
```

---

## Data Types

### Wallet Response (`GetWalletRes`)

```ts
{
  _id: string;
  userSub: string;
  publicAddress: string;
  smartWalletAddress: string | null;
  isSmartWalletDeployed: boolean;
  revoked: boolean;
  sbtTokenId: string | null;
  createdAt: string;
}
```

### SBT Response (`GetSbtRes`)

```ts
{
  userSub: string;
  tokenId: number;
  ownerAddress: string;
  identity: {
    quadronRole: string;
    reputationScore: number;
    contributions: number;
    reviews: number;
    badges: string[];
    metadataVersion: number;
    name: string;
  };
  revoked: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Identity Update Fields

```ts
{
  quadronRole?: string;
  reputationScore?: number;
  contributions?: number;
  reviews?: number;
  badges?: string[];
}
```

---

## ❗ Error Handling

### SDK Initialization Errors

| Error Message                                                   | Cause                                       |
| --------------------------------------------------------------- | ------------------------------------------- |
| `API_BASE_URL is required to initialize the SDK`                | `API_BASE_URL` missing in config            |
| `ACCESS_TOKEN is required to initialize the SDK on client side` | Missing Bearer token when `isClient=true`   |
| `API_KEY is required to initialize the SDK on server side`      | Missing API key when `isClient=false`       |
| `SDK not initialized. Please call initSDK first.`               | `updateAccessToken` called before `initSDK` |
| `updateAccessToken can only be used in client mode`             | `updateAccessToken` called in server mode   |

### Wallet Errors

| Error Message                                     | Cause                                       |
| ------------------------------------------------- | ------------------------------------------- |
| `User authentication required`                    | Missing user authentication                 |
| `Wallet not found for this user`                  | No wallet exists for the user               |
| `Failed to retrieve wallet information`           | Wallet retrieval failed                     |
| `userSub is required in request body`             | Missing userSub parameter                   |
| `Wallet already exists for this user`             | Attempting to create duplicate wallet       |
| `Failed to create wallet`                         | Wallet creation failed                      |
| `Failed to recover wallet`                        | Wallet recovery failed                      |
| `Base wallet not found for smart wallet creation` | No base wallet exists                       |
| `Smart wallet already deployed for this user`     | Smart wallet already exists                 |
| `Failed to create smart wallet`                   | Smart wallet creation failed                |
| `Wallet is already revoked`                       | Attempting to revoke already revoked wallet |
| `Failed to revoke wallet`                         | Wallet revocation failed                    |

### SBT Errors

| Error Message                                  | Cause                                     |
| ---------------------------------------------- | ----------------------------------------- |
| `userSub is required`                          | Missing userSub parameter                 |
| `User already owns an active SBT`              | Attempting to mint duplicate SBT          |
| `Wallet not found for this user`               | No wallet exists for user                 |
| `Cannot mint SBT for revoked wallet`           | Attempting to mint SBT for revoked wallet |
| `No SBT found for this user`                   | No SBT exists for user                    |
| `SBT is already revoked`                       | Attempting to revoke already revoked SBT  |
| `userSub and updates object are required`      | Missing required parameters for update    |
| `No valid identity fields provided for update` | Invalid update data                       |
| `SBT not found for update`                     | No SBT exists to update                   |
| `SBT metadata not found`                       | SBT metadata doesn't exist                |

Always handle null/error responses and refresh expired tokens using `updateAccessToken(newToken)` in client mode.

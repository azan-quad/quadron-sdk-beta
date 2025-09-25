# Quadron SDK Reference

A unified SDK for managing **wallets** and **soulbound tokens (SBTs)** across frontend (client) and backend (server) environments.

- **Client SDK** → Authenticated with **Bearer Access Token** (from Cognito/Keycloak).
- **Server SDK** → Authenticated with **API Key** (secure backend integration).

---

## Installation

```bash
npm install quadron-sdk
```

---

## Quick Start

```ts
import { initSDK, updateAccessToken } from "quadron-sdk";

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

| Function                              | Module  | Mode   | Auth Required | Backend Route                  |
| ------------------------------------- | ------- | ------ | ------------- | ------------------------------ |
| `wallets.get()`                       | Wallets | Client | Bearer Token  | `GET /wallet/`                 |
| `wallets.getBySub(userSub)`           | Wallets | Server | API Key       | `GET /wallet/user?userSub=`    |
| `wallets.create({ withSmartWallet })` | Wallets | Client | Bearer Token  | `POST /wallet/create`          |
| `wallets.recover()`                   | Wallets | Client | Bearer Token  | `POST /wallet/recover`         |
| `wallets.smart()`                     | Wallets | Client | Bearer Token  | `POST /wallet/smart`           |
| `wallets.revoke(userSub)`             | Wallets | Server | API Key       | `POST /wallet/revoke`          |
| `sbt.mint(userSub)`                   | SBT     | Server | API Key       | `POST /sbt/mint`               |
| `sbt.revoke(userSub)`                 | SBT     | Server | API Key       | `POST /sbt/revoke`             |
| `sbt.getMySbt()`                      | SBT     | Client | Bearer Token  | `GET /sbt/me`                  |
| `sbt.getSbtBySub(userSub)`            | SBT     | Server | API Key       | `GET /sbt/user?userSub=`       |
| `sbt.update(updates)`                 | SBT     | Server | API Key       | `PATCH /sbt/update`            |
| `sbt.getPublicMetadata(tokenId)`      | SBT     | Public | None          | `GET /sbt/token/:tokenId`      |

---

## Wallet Examples (Client)

```ts
// Get authenticated user wallet
await quadron.wallets.get();

// Create wallet
await quadron.wallets.create({ withSmartWallet: true });

// Recover wallet (returns mnemonic + private key)
await quadron.wallets.recover();

// Attach smart wallet (gasless)
await quadron.wallets.smart();
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
await quadronServer.sbt.update({
  userSub: "user-123",
  updates: { reputationScore: 100, badges: ["early-adopter"] },
});

// Get SBT by userSub
await quadronServer.sbt.getSbtBySub("user-123");
```

---

## ❗ Error Handling

| Error Message                                                   | Cause                                     |
| --------------------------------------------------------------- | ----------------------------------------- |
| `API_BASE_URL is required to initialize the SDK`                | `API_BASE_URL` missing in config          |
| `ACCESS_TOKEN is required to initialize the SDK on client side` | Missing Bearer token when `isClient=true` |
| `API_KEY is required to initialize the SDK on server side`      | Missing API key when `isClient=false`     |
| `API_BASE_URL is not set. Please initialize the SDK first.`     | `initSDK` not called before usage         |

Always handle null/error responses and refresh expired tokens using `updateAccessToken(newToken)` in client mode.

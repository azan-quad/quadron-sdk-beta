// // tests/sdk.test.ts
// import dotenv from "dotenv";
// import { initSDK } from "../src";

// dotenv.config({ path: ".env.test" });

// const { API_BASE_URL, API_KEY, COGNITO_JWT, COGNITO_SUB } = process.env;

// if (!API_BASE_URL || !API_KEY || !COGNITO_JWT || !COGNITO_SUB) {
//   throw new Error("Missing required env vars in .env.test");
// }

// // --- Initialize ONCE per mode ---
// const clientSdk = initSDK({
//   API_BASE_URL,
//   COGNITO_JWT,
//   isClient: true,
// });

// const serverSdk = initSDK({
//   API_BASE_URL,
//   API_KEY,
//   isClient: false,
// });

// // --- Helpers ---
// function logResult(label: string, res: any) {
//   if (!res) {
//     console.error(`${label}: ❌ failed (null)`);
//     return;
//   }
//   if ((res as any).error) {
//     console.error(`${label}: ❌ error=`, (res as any).error);
//   } else {
//     console.log(`${label}: ✅ success`);
//   }
// }

// async function runWithCatch(label: string, fn: () => Promise<any>) {
//   try {
//     const res = await fn();
//     logResult(label, res);
//     return res;
//   } catch (err: any) {
//     console.error(
//       `❌ ${label} failed:`,
//       err.response ? { status: err.response.status, data: err.response.data } : err.message,
//     );
//     throw err;
//   }
// }

// // --- Test map (reuse singletons) ---
// const tests: Record<string, () => Promise<void>> = {
//   // Client SDK
//   getWallet: async () => runWithCatch("getWallet", () => clientSdk.wallets.get()),
//   createWallet: async () => runWithCatch("createWallet", () => clientSdk.wallets.create({ withSmartWallet: true })),
//   recoverWallet: async () => runWithCatch("recoverWallet", () => clientSdk.wallets.recover()),
//   smartWallet: async () => runWithCatch("smartWallet", () => clientSdk.wallets.smart()),
//   getMySbt: async () => runWithCatch("getMySbt", () => clientSdk.sbt.getMySbt()),

//   // Server SDK
//   revokeWallet: async () => runWithCatch("revokeWallet", () => serverSdk.wallets.revoke({ cognitoSub: COGNITO_SUB! })),
//   mintSbt: async () => runWithCatch("mintSbt", () => serverSdk.sbt.mint({ cognitoSub: COGNITO_SUB! })),
//   revokeSbt: async () => runWithCatch("revokeSbt", () => serverSdk.sbt.revoke({ cognitoSub: COGNITO_SUB! })),
//   updateSbt: async () =>
//     runWithCatch("updateSbt", () =>
//       serverSdk.sbt.update({
//         cognitoSub: COGNITO_SUB!,
//         updates: { quadronRole: "integration-tester" },
//       }),
//     ),
//   getSbtById: async () => runWithCatch("getSbtById", () => serverSdk.sbt.getSbtById(COGNITO_SUB!)),
// };

// // --- Jest runner ---
// describe("Quadron SDK Modular Tests", () => {
//   const fnName = process.env.TEST_FUNC;

//   if (!fnName) {
//     it("should require TEST_FUNC env var", () => {
//       throw new Error("Please set TEST_FUNC=<functionName>");
//     });
//     return;
//   }

//   const fn = tests[fnName];
//   if (!fn) {
//     it("should require valid TEST_FUNC", () => {
//       throw new Error(`Unknown TEST_FUNC=${fnName}. Available: ${Object.keys(tests).join(", ")}`);
//     });
//     return;
//   }

//   it(`should run ${fnName}`, async () => {
//     await fn();
//   });
// });

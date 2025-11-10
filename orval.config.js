import { defineConfig } from "orval";

export default defineConfig({
  "espera-queue-be": {
    input: "./swagger/api-spec.json",
    output: {
      mode: "tags-split",
      target: "./src/app/api/generated/client.ts",
      schemas: "./src/app/api/generated/model",
      client: "swr",
      baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
      override: {
        useNativeEnums: true,
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});

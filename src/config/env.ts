// Environment configuration
export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
    dbUrl: import.meta.env.VITE_DB_URL || "http://localhost:3001",
    dbPort: import.meta.env.VITE_DB_PORT || "3001",
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || "Product List App",
    devMode: import.meta.env.VITE_DEV_MODE === "true",
    port: import.meta.env.VITE_PORT || "5173",
  },
  github: {
    repoUrl:
      import.meta.env.VITE_GITHUB_REPO_URL ||
      "https://github.com/vsevolod-viliatser/inforce-task.git",
  },
} as const;

// Type-safe environment variables
export type Config = typeof config;

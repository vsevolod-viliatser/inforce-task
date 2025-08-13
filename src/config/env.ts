// Environment configuration
export const config = {
  api: {
    baseUrl: "http://localhost:3002", // Force correct backend port
    dbUrl: "http://localhost:3002", // Force correct backend port
    dbPort: "3002", // Force correct backend port
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

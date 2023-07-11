module.exports = {
  apps: [
    {
      name: "2guys",
      exec_mode: "cluster",
      instances: 1, // Or a number of instances
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      env: {
        PORT: 3000,
        NODE_ENV: "development",
        BASE_URL: "http://localhost:8000/",
        AXIOS_BASE_URL: "http://localhost:8000/v1/",
        WEB_APP_BASE_URL: "http://localhost:3000/",
      },
      env_staging: {
        PORT: 3000,
        NODE_ENV: "staging",
        BASE_URL: "https://staging-api.2guys.app/",
        AXIOS_BASE_URL: "https://localhost:8000/v1/",
        WEB_APP_BASE_URL: "https://twoguys.app/",
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: "production",
        NODE_OPTIONS: "--openssl-legacy-provider",
        BASE_URL: "https://staging-api.2guys.app/",
        AXIOS_BASE_URL: "https://staging-api.2guys.app/v1/",
        WEB_APP_BASE_URL: "https://twoguys.app/",
      },
    },
  ],
};

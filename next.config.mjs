import dotenv from "dotenv";

console.log("process.env.APP_ENV", process.env.APP_ENV);
dotenv.config({ path: `./.env.${process.env.APP_ENV}` });

const nextConfig = {
  allowedDevOrigins: [
    "liff.lvh.me:3004",
    "distract-spleen-antiques.ngrok-free.dev",
  ],
  env: {
    APP_ENV: process.env.APP_ENV,
    API_HOSTNAME: process.env.API_HOSTNAME,
    FRONTEND_HOSTNAME: process.env.FRONTEND_HOSTNAME,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    // removeConsole: !process.env.APP_ENV?.includes("dev"),
  },
  images: {
    remotePatterns: [
      new URL(`${process.env.API_HOSTNAME}/rails/active_storage/**`),
    ],
    deviceSizes: [
      320, 380, 420, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
    ],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Server",
            value: "web",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

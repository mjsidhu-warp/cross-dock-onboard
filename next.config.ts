import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cross-dock-onboard",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

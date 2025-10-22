import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a self-contained server output for lean Docker images
  output: "standalone",
};

export default nextConfig;

import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/kontakt",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/kontakt",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dae.varzeagrande.mt.gov.br",
        port: "443",
        pathname: "/cms/uploads/*",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/*",
      }
    ],
  },
};

export default nextConfig;


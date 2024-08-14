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
    ],
  },
};

export default nextConfig;


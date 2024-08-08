/** @type {import('next').NextConfig} */

const parsedUrl = new URL(process.env.NEXT_PUBLIC_API_URL);

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: parsedUrl.protocol.replace(":", ""),
        hostname: parsedUrl.hostname,
        port: parsedUrl.port ? parsedUrl.port : "",
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;


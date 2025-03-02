/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "a.slack-edge.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;

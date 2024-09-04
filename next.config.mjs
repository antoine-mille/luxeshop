/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "antoine-mille-bucket.s3.eu-west-3.amazonaws.com"
      }
    ]
  }
};

export default nextConfig;

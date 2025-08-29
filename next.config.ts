import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'], // Adicione os domínios permitidos aqui
    remotePatterns: [
      {
        //protocol: 'https',
        hostname: 'res.cloudinary.com'
      }]
  }
}

export default nextConfig;

import type { NextConfig } from "next";

const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

let payloadHostname = 'localhost';
try {
  const url = new URL(payloadUrl);
  payloadHostname = url.hostname;
} catch (e) {
  console.warn("Invalid NEXT_PUBLIC_PAYLOAD_URL for Image loader");
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: payloadUrl.startsWith('https') ? 'https' : 'http',
        hostname: payloadHostname,
        port: payloadUrl.includes(':') ? new URL(payloadUrl).port : '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self' ${payloadUrl}`,
          },
        ],
      },
    ]
  },
};

export default nextConfig;

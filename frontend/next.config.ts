import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },
  // **Crucial Fix**: Add all required image domains to the list.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
      // Add the hostname for our placeholder images
      {
        protocol: 'https',
        hostname: 'placeholder.co',
        port: '',
      },
    ],
  },
}

export default nextConfig

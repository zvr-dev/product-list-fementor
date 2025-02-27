import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    
    experimental: {
      turbo: {
        rules: {
          '*.svg': {      // Allow webpack to load svg's as js components
            loaders: ['@svgr/webpack'],
            as: '*.js',
          },
        },
      },
    },
  
};

export default nextConfig;

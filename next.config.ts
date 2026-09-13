import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
      {
        protocol: 'https',
        hostname: 'xvvhrjptomwadkmpnjrg.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    localPatterns: [
      { pathname: '/uploads/avatars/**' },
      { pathname: '/imgs/**' },
    ],
  },
};

export default nextConfig;

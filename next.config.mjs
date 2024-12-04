/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['ulcggrutwonkxbiuigdu.supabase.co'],
  },
  webpack(config) {
    // Adiciona suporte para arquivos SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);

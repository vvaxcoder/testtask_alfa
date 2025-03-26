import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['fakestoreapi.com', 'media.istockphoto.com'],
    unoptimized: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/products",
  //       permanent: true,
  //     },
  //   ];
  // },
  distDir: 'out',
  basePath: isProd ? '/testtask_alfa' : '',
  assetPrefix: isProd ? '/testtask_alfa/' : '',
};

export default nextConfig;

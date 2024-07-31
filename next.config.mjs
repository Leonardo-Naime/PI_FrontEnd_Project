/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['github.com', 'placehold.co']
    },
    experimental: {
      pagesDir: true
    }
  };
  
  export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true, // Ensure this is set for the App Router
    },
    srcDir: 'src', // Tell Next.js to look in 'src' for pages or app
  };
  
  export default nextConfig;
  
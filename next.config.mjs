// next.config.mjs
import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public', // where the service worker gets generated
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // PWA only in production
})({
  reactStrictMode: true,
});

export default nextConfig;

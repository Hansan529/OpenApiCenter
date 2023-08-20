/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['file.koreafilm.or.kr'],
  },
};
module.exports = nextConfig

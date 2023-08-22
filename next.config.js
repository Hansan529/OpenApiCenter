/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["file.koreafilm.or.kr"],
  },
};
module.exports = nextConfig

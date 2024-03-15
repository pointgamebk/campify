/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["utfs.io"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "utfs.io",
//         port: "",
//       },
//     ],
//   },
// };

const nextConfig = {
  images: {
    domains: ["utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "connect-src https://checkout.stripe.com; frame-src https://checkout.stripe.com https://connect-js.stripe.com https://js.stripe.com; script-src  https://checkout.stripe.com https://connect-js.stripe.com https://js.stripe.com; img-src 'self' https://*.stripe.com",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

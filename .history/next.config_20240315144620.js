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
              "connect-src https://connect-js.stripe.com https://js.stripe.com; frame-src https://connect-js.stripe.com https://js.stripe.com; img-src 'self' https://*.stripe.com; script-src https://connect-js.stripe.com https://js.stripe.com; style-src 'sha256-0hAheEzaMe6uXIKV4EehS9pu1am1lj/KnnzrOYqckXk='",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

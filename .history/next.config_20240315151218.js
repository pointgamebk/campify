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
              "script-src 'unsafe-eval' 'unsafe-inline' 'unsafe-hashes' https://www.google.com/recaptcha/api.js https://www.google.com/recaptcha/enterprise.js https://www.google.com/recaptcha/ https://www.recaptcha.net/recaptcha/enterprise.js https://www.recaptcha.net/recaptcha/ https://www.gstatic.com/recaptcha/api2/ https://www.gstatic.com/recaptcha/ https://hcaptcha.com https://*.hcaptcha.com 'self' 'nonce-6A6ekVlcXA1iOizAS9PYFg==' 'sha256-47mKTaMaEn1L3m5DAz9muidMqw636xxw7EFAK/YnPdg=' https://js.stripe.com https://dashboard.stripe.com https://connect.stripe.com https://b.stripecdn.com https://connect-js.stripe.com 'report-sample'",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  images: {
    domains: [
      'oaidalleapiprodscus.blob.core.windows.net',
      'lh3.googleusercontent.com',
      'd24zvlhubf9n6d.cloudfront.net',
      'cdn.discordapp.com',
      'd9tzafiq1eg5o.cloudfront.net',
      'imagin-icons-storage.s3.ap-southeast-2.amazonaws.com',
      'imagin-dev-env.s3.ap-southeast-2.amazonaws.com',
    ],

  },

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  async rewrites() {
    return [
      {
        source: '/api/stripe',
        destination: '/api/stripe.ts',
      },
    ];
  },


};
export default config;

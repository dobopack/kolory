module.exports = {
  i18n: {
    locales: ["pl"],
    defaultLocale: "pl",
  },
  async redirects() {
    return [
      {
        source: "/ochrona_danych",
        destination: "/ochrona-danych",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["media.graphcms.com", "media.graphassets.com"],
  },
};

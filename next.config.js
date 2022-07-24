module.exports = {
  i18n: {
    locales: ["pl"],
    defaultLocale: "pl",
  },
  async redirects() {
    return [
      {
        source: "/\\?t=aboutSection",
        destination: "/",
        permanent: true,
      },
      {
        source: "/\\?t=productSection",
        destination: "/",
        permanent: true,
      },
      {
        source: "/\\?t=footerSection",
        destination: "/",
        permanent: true,
      },
      {
        source: "/\\?t=formSection",
        destination: "/",
        permanent: true,
      },
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

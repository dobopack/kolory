import gql from "graphql-tag";
import client from "../apolloClient";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://www.kolory.com",
  }[process.env.NODE_ENV];

  const staticPages = ["", "ochrona_danych", "polityka"].map(
    (staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    }
  );

  const { data } = await client.query({
    query: gql`
      query {
        categories(where: { is_active: true }) {
          slug
          product(where: { is_active: true }) {
            slug
          }
        }
      }
    `,
  });

  const { categories } = data;
  const dynamicPages = [];

  categories.forEach((cat) => {
    dynamicPages.push(`${baseUrl}/${cat.slug}`);
    cat.product.forEach((prod) => {
      dynamicPages.push(`${baseUrl}/${cat.slug}/${prod.slug}`);
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
        ${dynamicPages
          .map((url) => {
            return `
          <url>
            <loc>${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
          </url>
        `;
          })
          .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;

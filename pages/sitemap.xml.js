import gql from "graphql-tag";
import client from "../apolloClient";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://www.kolory.com",
  }[process.env.NODE_ENV];

  const staticImages = [
    `${baseUrl}/hero-image.jpg`,
    `${baseUrl}/logo-white.svg`,
    `${baseUrl}/logo-dark.svg`,
  ];

  const { data } = await client.query({
    query: gql`
      query {
        categories(where: { is_active: true }) {
          slug
          image {
            url
          }
          product(where: { is_active: true }) {
            slug
            image {
              url
            }
          }
        }
      }
    `,
  });

  const { categories } = data;
  const dynamicPages = [];
  // category images on main page
  const categoryImages = [];
  // product images on category page
  let productImages = {};

  categories.forEach((cat) => {
    categoryImages.push(cat.image.url);
    dynamicPages.push({
      type: "category",
      url: `${baseUrl}/${cat.slug}`,
      image: cat.image.url,
    });
    cat.product.forEach((prod) => {
      let url = `${baseUrl}/${cat.slug}`;

      if (!productImages[url]) productImages[url] = [];
      productImages[url].push(prod.image.url);

      dynamicPages.push({
        type: "product",
        url: `${url}/${prod.slug}`,
        image: prod.image.url,
      });
    });
  });

  const staticPages = [
    { url: "", image: [...categoryImages, ...staticImages] },
  ].map(({ url, image }) => {
    return { url: `${baseUrl}/${url}`, image: image };
  });

  const getImages = (type, url, image) => {
    let result = "";
    if (type === "product") {
      result = `<image:image>
              <image:loc>${image}</image:loc>
            </image:image>`;
    } else if (type === "category") {
      if (productImages[url]) {
        productImages[url].map((imageUrl) => {
          result += `<image:image>
              <image:loc>${imageUrl}</image:loc>
            </image:image>`;
        });
      }
    } else if (type === "static") {
      image.map((imageUrl) => {
        result += `<image:image>
              <image:loc>${imageUrl}</image:loc>
            </image:image>`;
      });
    }

    return result;
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${staticPages
        .map(({ url, image }) => {
          return `
            <url>
              <loc>${url}</loc>
              ${getImages("static", url, image)}
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
        ${dynamicPages
          .map(({ type, url, image }) => {
            return `
          <url>
            <loc>${url}</loc>
            ${getImages(type, url, image)}
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

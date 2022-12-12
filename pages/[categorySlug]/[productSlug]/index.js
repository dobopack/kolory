import Head from "next/head";

import gql from "graphql-tag";
import client from "../../../apolloClient";

import ProductSection from "../../../components/products/ProductSection";
import configData from "../../../config";

import Breadcrumbs from "../../../components/ui/Breadcrumbs";

export default function ProductPage({ product, config }) {
  let title;
  if (product.titleTag) {
    title = product.titleTag;
  } else if (product.name) {
    title = product.name + " - Dobopack Trading";
  } else if (config.title) {
    title = config.title;
  } else {
    title = configData.title;
  }

  let description;
  if (product.descriptionTag) {
    description = product.descriptionTag;
  } else if (config.description) {
    description = config.description;
  } else {
    description = configData.description;
  }

  const currentUrl = `${configData.baseUrl}/${product.category.slug}/${product.slug}`;

  const breadcrumbsLinks = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Główna",
      item: configData.baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: product.category.name,
      item: `${configData.baseUrl}/${product.category.slug}`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: product.name,
      item: currentUrl,
    },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={product.image.url} />
        <meta property="og:url" content={currentUrl} />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href={currentUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbsLinks,
            }),
          }}
        />
      </Head>
      <Breadcrumbs links={breadcrumbsLinks} />
      <ProductSection product={product} />
    </>
  );
}

export async function getStaticPaths(context) {
  const { data } = await client.query({
    query: gql`
      query {
        products {
          slug
          category {
            slug
          }
        }
      }
    `,
  });

  const { products } = data;

  const paths = products.map((product) => ({
    params: {
      productSlug: product.slug,
      categorySlug: product.category ? product.category.slug : "brak",
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const slug = params.productSlug;

  const { data } = await client.query({
    query: gql`
      query Products($slug: String!) {
        products(where: { slug: $slug }) {
          id
          name
          image {
            url
          }
          shortDescription
          shortDescriptionMarkdown
          longDescription
          longDescriptionMarkdown
          titleTag
          descriptionTag
          slug
          category {
            name
            slug
          }
        }
      }
    `,
    variables: { slug },
  });

  const { products } = data;

  const product = products[0];
  let notFound = product ? false : true;

  if (!product.category) notFound = true;

  const confData = await client.query({
    query: gql`
      query {
        config(where: { id: "ckv9wu0j4pwqs0c08eictaxxd" }) {
          title
          description
        }
      }
    `,
  });

  const { config } = confData.data;

  return {
    props: {
      product,
      config,
    },
    notFound,
    revalidate: 10,
  };
}

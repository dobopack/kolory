import Head from "next/head";

import gql from "graphql-tag";
import client from "../../../apolloClient";

import ProductSection from "../../../components/products/ProductSection";
import configData from "../../../config";

export default function ProductPage({ product, config }) {
  let title;
  if (product.name) {
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

  let keywords;
  if (product.keywords) {
    keywords = product.keywords;
  } else if (config.keywords) {
    keywords = config.keywords;
  } else {
    keywords = configData.keywords;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.svg" />
      </Head>
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
          longDescription
          descriptionTag
          keywords
        }
      }
    `,
    variables: { slug },
  });

  const { products } = data;

  const product = products[0];
  const notFound = product ? false : true;

  const confData = await client.query({
    query: gql`
      query {
        config(where: { id: "ckv9wu0j4pwqs0c08eictaxxd" }) {
          title
          description
          keywords
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
    revalidate: 1,
  };
}

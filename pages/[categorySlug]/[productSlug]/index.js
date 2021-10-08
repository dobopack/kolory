import Head from "next/head";

import gql from "graphql-tag";
import client from "../../../apolloClient";

import ProductSection from "../../../components/products/ProductSection";

export default function ProductPage({ product }) {
  return (
    <>
      <Head>
        <title>
          Dobopack - dystrybutor dodatków barwiących i smakowo-zapachowych do
          żywności
        </title>
        <meta
          name="description"
          content="Dobopack Trading - oferujemy dodatki do żywności dla producentów: barwniki spożywcze naturalne i syntetyczne, aromaty, oleorezyny, olejki eteryczne, bazy do napojów. +48 22 633 96 27"
        />
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
    params: { productSlug: product.slug, categorySlug: product.category.slug },
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
        }
      }
    `,
    variables: { slug },
  });

  const { products } = data;

  const product = products[0];

  return {
    props: {
      product,
    },
    revalidate: 1,
  };
}

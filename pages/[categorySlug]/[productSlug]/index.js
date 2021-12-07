import Head from "next/head";

import gql from "graphql-tag";
import client from "../../../apolloClient";

import ProductSection from "../../../components/products/ProductSection";

export default function ProductPage({ product }) {
  return (
    <>
      <Head>
        <html lang="pl-PL" />
        <title>
          Dobopack - dystrybutor dodatków barwiących i smakowo-zapachowych do
          żywności
        </title>
        <meta
          name="description"
          content="Dobopack Trading - oferujemy dodatki do żywności dla producentów: barwniki spożywcze naturalne i syntetyczne, aromaty, oleorezyny, olejki eteryczne, bazy do napojów. +48 22 633 96 27"
        />
        <meta
          name="keywords"
          content="Barwnik spożywczy, Barwniki spożywcze, Barwniki spożywcze w proszku, Aromaty spożywcze, Oleorezyny, Olejki eteryczne, tartrazyna E102, żółcień chinolinowa E104, żółcień pomarańczowa E110, azorubina E122, czerwień koszenilowa E124, erytrozyna E127, czerwień Allura E129, błękit patentowy E131, indygotyna E132, błękit brylantowy E133, zieleń S E142, czerń brylantowa E151, brąz HT E155, barwnik kurkumina, barwnik chlorofilina, bazy do napojów, ekstrakty przyprawowe, oleorezyna capsicum, olejek czarnego pieprzu, olejek lawendowy, olejek miętowy, oleorezyna czarnego pieprzu, oleorezyna białego pieprzu, oleorezyna papryki, oleorezyna kminku zwyczajnego, oleorezyna goździka, oleorezyna gałki muszkatołowej, bazy i aromaty do napojów BCAA, bazy i aromaty do napojów energetyzujących, bazy i aromaty do napojów z wodą kokosową, bazy i aromaty do napojów słodowych, bazy i aromaty do napojów float, aromaty i bazy do napojów cydrowych, zamiennik bieli tytanowej, aromaty, proszkowe, aromaty płynne, aromaty granulowane"
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
        }
      }
    `,
    variables: { slug },
  });

  const { products } = data;

  const product = products[0];
  const notFound = product ? false : true;

  return {
    props: {
      product,
    },
    notFound,
    revalidate: 1,
  };
}

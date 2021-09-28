import gql from "graphql-tag";
import Head from "next/head";
import client from "../apolloClient";

import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import ProductsSection from "../components/landing/ProductsSection";

export default function Home({ categories }) {
  return (
    <div>
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
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection categories={categories} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        categories {
          id
          name
          slug
          image {
            url
          }
        }
      }
    `,
  });

  const { categories } = data;

  return {
    props: {
      categories,
    },
    revalidate: 10,
  };
}

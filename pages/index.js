import gql from "graphql-tag";
import Head from "next/head";
import client from "../apolloClient";

import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import ProductsSection from "../components/landing/ProductsSection";
import FormSection from "../components/landing/FormSection";

export default function Home({ categories, config }) {
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
        <HeroSection config={config} />
        <AboutSection config={config} />
        <ProductsSection categories={categories} config={config} />
        <FormSection config={config} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        categories(where: { is_active: true }) {
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

  const confData = await client.query({
    query: gql`
      query {
        config(where: { id: "ckv9wu0j4pwqs0c08eictaxxd" }) {
          company_description
          about_description
          products_description
          card1_header
          card1_image {
            url
          }
          card1_content
          card2_header
          card2_image {
            url
          }
          card2_content
          card3_header
          card3_image {
            url
          }
          card3_content
        }
      }
    `,
  });

  const { config } = confData.data;

  return {
    props: {
      categories,
      config,
    },
    revalidate: 1,
  };
}

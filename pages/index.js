import gql from "graphql-tag";
import Head from "next/head";
import client from "../apolloClient";
import AboutSection from "../components/landing/AboutSection";

import HeroSection from "../components/landing/HeroSection";

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
      </main>
      {/* <ul>
        {categories.map((category, i) => (
          <li key={i}>
            <a href={category.slug}>{category.name}</a>
          </li>
        ))}
      </ul> */}
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

import gql from "graphql-tag";
import Head from "next/head";
import client from "../apolloClient";
import { useRouter } from "next/router";
import { useEffect } from "react";

import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import ProductsSection from "../components/landing/ProductsSection";
import FormSection from "../components/landing/FormSection";

export default function Home({ categories, config }) {
  const router = useRouter();

  useEffect(() => {
    const queryTarget = router.query.t;
    if (queryTarget) {
      const element = document.querySelector(`#${queryTarget}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  return (
    <div>
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
      <main>
        <HeroSection config={config} />
        <ProductsSection categories={categories} config={config} />
        <AboutSection config={config} />
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

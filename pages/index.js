import gql from "graphql-tag";
import Head from "next/head";
import client from "../apolloClient";
import { useRouter } from "next/router";
import { useEffect } from "react";

import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import ProductsSection from "../components/landing/ProductsSection";
import FormSection from "../components/landing/FormSection";

import configData from "../config";

export default function Home({ categories, config }) {
  const router = useRouter();

  useEffect(() => {
    const asPath = router.asPath.includes("#");
    if (asPath) {
      const idTarget = router.asPath.split("#")[1];
      const element = document.querySelector(`#${idTarget}Section`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  const title = config.title ? config.title : configData.title;
  const description = config.description
    ? config.description
    : configData.description;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${configData.baseUrl}/hero-image.webp`}
        />
        <meta property="og:url" content={configData.baseUrl} />
        <link rel="icon" href="/favicon.svg" />
        <link rel="canonical" href="https://www.kolory.com" />
      </Head>
      <HeroSection config={config} />
      <ProductsSection categories={categories} config={config} />
      <AboutSection config={config} />
      <FormSection config={config} />
    </>
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
          title
          description
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

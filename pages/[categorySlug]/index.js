import Head from "next/head";

import gql from "graphql-tag";
import client from "../../apolloClient";

import Section from "../../components/ui/Section";
import Header from "../../components/ui/Header";
import CategorySection from "../../components/categories/CategorySection";

import classes from "../../styles/category.module.css";

export default function CategoryPage({ category, slug }) {
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
      <Section className={classes.categorySection}>
        <Header>{category.name}</Header>
        <p className={classes.description}>{category.description}</p>
        <CategorySection category={category} slug={slug} />
      </Section>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        categories {
          slug
        }
      }
    `,
  });

  const { categories } = data;

  const paths = categories.map((category) => ({
    params: { categorySlug: category.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const slug = params.categorySlug;

  const newsQuery = slug === "nowosci" ? "last: 8, " : "";

  const { data } = await client.query({
    query: gql`
      query Category($slug: String!) {
        categories(where: { slug: $slug }) {
          id
          name
          slug
          description
          product(${newsQuery}where: { is_active: true }) {
            id
            name
            slug
            color
            image {
              url
            }
          }
        }
      }
    `,
    variables: { slug },
  });

  const { categories } = data;

  const category = categories[0];
  const notFound = category ? false : true;

  return {
    props: {
      category,
      slug,
    },
    notFound,
    revalidate: 1,
  };
}

import Head from "next/head";
import Custom404 from "../404";

import gql from "graphql-tag";
import client from "../../apolloClient";
import configData from "../../config";

import Section from "../../components/ui/Section";
import Header from "../../components/ui/Header";
import CategorySection from "../../components/categories/CategorySection";

import Breadcrumbs from "../../components/ui/Breadcrumbs";

import classes from "../../styles/category.module.css";

export default function CategoryPage({
  category,
  slug,
  config,
  canonical,
  allCategories,
}) {
  if (!category) {
    return <Custom404 />;
  }

  let title;
  if (category.titleTag) {
    title = category.titleTag;
  } else if (category.name) {
    title = category.name + " - Dobopack Trading";
  } else if (config.title) {
    title = config.title;
  } else {
    title = configData.title;
  }

  let description;
  if (category.descriptionTag) {
    description = category.descriptionTag;
  } else if (config.description) {
    description = config.description;
  } else {
    description = configData.description;
  }

  const currentUrl = `${configData.baseUrl}/${slug}`;

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
      name: category.name,
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
        <meta property="og:image" content={category.image.url} />
        <meta property="og:url" content={currentUrl} />
        <link rel="icon" type="image/png" href="/favicon.png" />
        {canonical && <link rel="canonical" href={canonical} />}
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
      <Section className={classes.categorySection}>
        <Header>{category.name}</Header>
        <CategorySection category={category} allCategories={allCategories} />
      </Section>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const slug = query.categorySlug;

  const newsQuery = slug === "nowosci" ? "last: 8, " : "";

  const { data } = await client.query({
    query: gql`
      query Category($slug: String!) {
        categories(where: { slug: $slug }) {
          id
          name
          slug
          titleTag
          description
          descriptionMarkdown
          descriptionTag
          image {
            url
          }
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

  const category = categories[0] || null;

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

  const rootPage = `${configData.baseUrl}/${slug}`;

  const allCategoriesResult = await client.query({
    query: gql`
      query {
        categories(where: { is_active: true }) {
          slug
        }
      }
    `,
  });

  const allCategories =
    allCategoriesResult?.data?.categories.map((category) => category.slug) ||
    [];

  return {
    props: {
      category,
      slug,
      config,
      canonical: rootPage,
      allCategories,
    },
  };
}

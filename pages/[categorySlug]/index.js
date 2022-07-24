import Head from "next/head";
import ErrorPage from "next/error";

import gql from "graphql-tag";
import client from "../../apolloClient";
import configData from "../../config";

import { useState, useEffect } from "react";

import Section from "../../components/ui/Section";
import Header from "../../components/ui/Header";
import CategorySection from "../../components/categories/CategorySection";

import Breadcrumbs from "../../components/ui/Breadcrumbs";

import classes from "../../styles/category.module.css";

export default function CategoryPage({ category, slug, config }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [err, setErr] = useState(false);

  const rootPage = `https://www.kolory.com/${slug}`;

  useEffect(() => {
    const maxPage = Math.ceil(category.product.length / 8);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let queryPage;
    if (params.p) {
      if (+params.p < 1 || +params.p > maxPage) {
        setErr(true);
      } else {
        queryPage = +params.p;
      }
    } else {
      queryPage = 1;
    }

    setCurrentPage(queryPage);
    setMaxPage(maxPage);
  }, [category.product.length]);

  let prev, next, canonical;

  if (currentPage < maxPage) {
    next = `${rootPage}/?p=${currentPage + 1}`;
  } else {
    next = null;
  }

  if (currentPage == 1) {
    canonical = rootPage;
    prev = null;
  }
  if (currentPage > 1) {
    canonical = `${rootPage}/?p=${currentPage}`;
    if (currentPage <= 2) {
      prev = rootPage;
    } else {
      prev = `${rootPage}/?p=${currentPage - 1}`;
    }
  }

  let title;
  if (category.name) {
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

  const breadcrumbsLinks = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Główna",
      item: "https://www.kolory.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: category.name,
      item: `https://www.kolory.com/${slug}`,
    },
  ];

  return (
    <>
      {err && <ErrorPage statusCode={404} />}
      {!err && (
        <>
          <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.svg" />
            {prev && <link rel="prev" href={prev} />}
            {next && <link rel="next" href={next} />}
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
            <h2 className={classes.description}>{category.description}</h2>
            <CategorySection category={category} slug={slug} />
          </Section>
        </>
      )}
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
          descriptionTag
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

  return {
    props: {
      category,
      slug,
      config,
    },
    notFound,
    revalidate: 1,
  };
}

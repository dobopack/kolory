import Head from "next/head";
import ErrorPage from "next/error";

import gql from "graphql-tag";
import client from "../../apolloClient";

import { useState, useEffect } from "react";

import Section from "../../components/ui/Section";
import Header from "../../components/ui/Header";
import CategorySection from "../../components/categories/CategorySection";

import classes from "../../styles/category.module.css";

export default function CategoryPage({ category, slug }) {
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

  return (
    <>
      {err && <ErrorPage statusCode={404} />}
      {!err && (
        <>
          <Head>
            <title>
              Dobopack - dystrybutor dodatków barwiących i smakowo-zapachowych
              do żywności
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
            {prev && <link rel="prev" href={prev} />}
            {next && <link rel="next" href={next} />}
            {canonical && <link rel="canonical" href={canonical} />}
          </Head>
          <Section className={classes.categorySection}>
            <Header>{category.name}</Header>
            <p className={classes.description}>{category.description}</p>
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

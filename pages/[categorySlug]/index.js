import gql from "graphql-tag";
import client from "../../apolloClient";

import Section from "../../components/ui/Section";
import Header from "../../components/ui/Header";

export default function CategoryPage({ category }) {
  return (
    <Section>
      <Header>{category.name}</Header>
      <ul>
        {category.product.map((prod, i) => (
          <li key={i}>
            <a href={`${category.slug}/${prod.slug}`}>{prod.name}</a>
          </li>
        ))}
      </ul>
    </Section>
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

  const { data } = await client.query({
    query: gql`
      query Category($slug: String!) {
        categories(where: { slug: $slug }) {
          id
          name
          slug
          product {
            id
            name
            slug
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
    },
    notFound,
    revalidate: 1,
  };
}

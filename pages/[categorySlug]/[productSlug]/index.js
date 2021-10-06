import gql from "graphql-tag";
import client from "../../../apolloClient";

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
}

export async function getStaticPaths(context) {
  const { data } = await client.query({
    query: gql`
      query {
        products {
          slug
          category {
            slug
          }
        }
      }
    `,
  });

  const { products } = data;

  const paths = products.map((product) => ({
    params: { productSlug: product.slug, categorySlug: product.category.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const slug = params.productSlug;

  const { data } = await client.query({
    query: gql`
      query Products($slug: String!) {
        products(where: { slug: $slug }) {
          id
          name
          image {
            url
          }
          shortDescription
          longDescription
        }
      }
    `,
    variables: { slug },
  });

  const { products } = data;

  const product = products[0];

  return {
    props: {
      product,
    },
    revalidate: 1,
  };
}

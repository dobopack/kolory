import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const isMain = Object.values(router.query).length > 0 ? false : true;

  return (
    <Layout isMain={isMain}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

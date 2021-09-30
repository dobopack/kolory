import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";

import removeHash from "../removeHash";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const isMain = router.route === "/" ? true : false;

  removeHash();

  return (
    <Layout isMain={isMain}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

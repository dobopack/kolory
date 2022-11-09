import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CookieBanner from "../components/ui/CookieBanner";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [cookieSet, setCookie] = useState(false);

  const isMain = router.route === "/" ? true : false;

  useEffect(() => {
    const isConsentSet = localStorage.getItem("cookieBannerDisplayed");
    if (isConsentSet) {
      setCookie(true);
    }
  }, [setCookie]);

  return (
    <Layout isMain={isMain}>
      <Component {...pageProps} />
      {!cookieSet && <CookieBanner checkCookie={setCookie} />}
    </Layout>
  );
}

export default MyApp;

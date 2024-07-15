import "../styles/globals.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const hideNavbarPaths = ["/login", "/signup"];

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Layout
        user={pageProps.user}
        showNavbar={!hideNavbarPaths.includes(router.pathname)}
      >
        {page}
      </Layout>
    ));

  return getLayout(<Component {...pageProps} />);
}

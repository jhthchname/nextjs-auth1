import React from "react";
import "../styles/globals.css";
import "antd/dist/reset.css"; // Reset Ant Design styles
import "../styles/globals.less"; // Import your global styles
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <ConfigProvider locale={enUS}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

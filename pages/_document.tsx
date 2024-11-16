import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import { Akira } from "@/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          Akira.variable,
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

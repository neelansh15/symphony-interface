import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono, Akira } from "@/config/fonts";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const queryClient = new QueryClient();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <DynamicContextProvider
            settings={{
              environmentId: "31d24fb4-0921-41a0-bcb1-f3b12e775832",
              walletConnectors: [EthereumWalletConnectors],
            }}
          >
            <div className={Akira.variable}>
              <Component {...pageProps} />
            </div>
          </DynamicContextProvider>
          <Toaster theme="dark" />
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};

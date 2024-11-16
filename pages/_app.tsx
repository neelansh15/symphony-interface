import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const queryClient = new QueryClient();

  const { theme } = useTheme();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster theme={theme === "dark" ? "dark" : "light"} />
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};

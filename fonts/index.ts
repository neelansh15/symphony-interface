import { Lobster } from "next/font/google";
import localFont from "next/font/local";

export const Akira = localFont({
  src: "./Akira Expanded.otf",
  variable: '--font-akira',
});

export const lobster = Lobster({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
});

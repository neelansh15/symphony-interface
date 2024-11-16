import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

import { Lobster } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const Akira = localFont({
  src: "./Akira Expanded.otf",
  display: "swap",
  variable: "--font-akira",
});

export const lobster = Lobster({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
});

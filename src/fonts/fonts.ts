import localFont from "next/font/local";
import { Mulish } from "next/font/google";
export const pixel = localFont({
  src: "./04B.ttf",
  display: "swap",
  variable: "--font-pixel",
});

export const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

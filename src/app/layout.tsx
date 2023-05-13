import "./globals.css";
import { pixel, mulish } from "../components/fonts";

export const metadata = {
  title: "Ragnarok Tools",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pixel.variable} ${mulish.variable}`}>
      <body className="w-screen h-screen bg-[url('../assets/background.jpg')] bg-no-repeat bg-zinc-950 bg-contain font-mulish">
        {children}
      </body>
    </html>
  );
}

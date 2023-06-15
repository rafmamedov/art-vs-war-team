import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";

import "@styles/globals.scss";

import ReduxProvider from "@redux/redux-provider";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

const kyivFont = localFont({
  src: "../fonts/KyivTypeSans-Regular-.woff",
  weight: "400",
  style: "normal",
  variable: "--font-kyiv",
  display: "swap",
});

const openSansFont1 = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-openSans",
  display: "swap",
});

export const metadata = {
  title: "Art vs war",
  description: "Artists gallery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSansFont1.variable} ${kyivFont.variable}`}>
        <Header />
        <ReduxProvider>{children}</ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}

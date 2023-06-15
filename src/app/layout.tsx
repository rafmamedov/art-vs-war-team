"use client"

import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from '../aws-exports';

import '@aws-amplify/ui-react/styles.css';

import "@styles/globals.scss";

import ReduxProvider from "@redux/redux-provider";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

Amplify.configure(awsExports);

interface Props {
  children: React.ReactNode;
}

const kyivFont = localFont({
  src: "../fonts/KyivTypeSans-Regular-.woff",
  weight: "400",
  style: "normal",
  variable: "--font-kyiv",
  display: "swap",
});

const openSansFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-openSans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Props) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
    >
      <body
        className={`${openSansFont.variable} ${kyivFont.variable}`}
        suppressHydrationWarning={true}
      >
        <Header />
        <ReduxProvider>
          <Authenticator.Provider>
            {children}
          </Authenticator.Provider>
        </ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}

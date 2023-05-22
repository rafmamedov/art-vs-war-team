import { Open_Sans } from "next/font/google";
import localFont from 'next/font/local';

import "./globals.scss";

const kyivFont = localFont({
   src: './fonts/KyivTypeSans-Regular-.woff',
   weight: '400',
   style: 'normal',
   variable: '--font-kyiv',
   display: "swap",
   });


const openSansFont = Open_Sans({
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
      <body className={`${openSansFont.variable} ${kyivFont.variable}`}>
        {children}
      </body>
    </html>
  );
}

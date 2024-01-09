import "./globals.css";
import { i18n } from "@/i18n.config";
import { Kadwa } from "next/font/google";

const kadwa = Kadwa({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "PDFActions",
  description:
    "PDFActions provides free and secure platform for your PDF needs without uploading, with no watermarks & completely free!",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang}>
      <body className={kadwa.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}

import "./globals.css";
import { i18n } from "@/i18n.config";
import Footer from "@/components/Footer.jsx";

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
      <body>
        <main>{children}</main>
        <Footer lang={params.lang} />
      </body>
    </html>
  );
}

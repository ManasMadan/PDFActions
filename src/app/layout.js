import "./globals.css";

export const metadata = {
  title: "PDFActions",
  description:
    "PDFActions provides free and secure platform for your PDF needs without uploading, with no watermarks & completely free!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

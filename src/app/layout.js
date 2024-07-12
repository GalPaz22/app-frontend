import Head from "next/head";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./Navbar";
import "./globals.css"; // Ensure to adjust the path based on your project structure

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  author: "100% Free ChatPDF",
  title: "100% Free ChatPDF- No registration required!",
  description: "Poor UI, High performance.",
  keywords: "chatbot, pdf, free, no registration required, Chat pdf בעברית",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <link rel="icon" href="/iconmonstr-file-34.svg" type="image/x-icon" />
        <link rel="icon" href="/iconmonstr-file-34.svg" type="image/png" />
        <link rel="icon" href="/iconmonstr-file-34.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="//iconmonstr-file-34.svg" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2790217851333052"
          crossOrigin="anonymous"
        ></script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            url: "https://www.freechatpdf.com/",
            logo: "https://www.freechatpdf.com/log.png",
            name: "100% Free ChatPDF",
          })}
        </script>
      </Head>
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-900 to-blue-500 text-white`}
      >
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="bg-gray-800 py-4 text-center text-white">
          <p>
            &copy; {new Date().getFullYear()} Free ChatPDF. All rights reserved.
          </p>
        </footer>
        <Analytics />
        <script src="//servedby.eleavers.com/ads/ads.php?t=MzA0NDc7MjA1NjE7aG9yaXpvbnRhbC5iYW5uZXI=&index=1"></script>
      </body>
    </html>
  );
};

export default RootLayout;

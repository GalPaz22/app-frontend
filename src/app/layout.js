import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "100% Free ChatPDF- no registration required",
  description: "Poor UI, High performance.",
  keywords: "chatbot, pdf, free, no registration required",
  links: {
    icon: "/iconmonstr-file-34.svg",
  },
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="\iconmonstr-file-34.svg"></link>
      
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2790217851333052"
     crossorigin="anonymous"></script>
  <>
      <script
      async src="https://www.googletagmanager.com/gtag/js?id=G-XQHNQGN6SY"
      strategy="afterInteractive"
      />

      <script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XQHNQGN6SY');
          `}
      </script>
    </>

   
     

      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

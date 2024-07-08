import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "100% Free ChatPDF-  No registration required!",
  description: "Poor UI, High performance.",
  keywords: "chatbot, pdf, free, no registration required, Chat pdf בעברית",
  icons: {
    icon: "/iconmonstr-file-34.svg",
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script async="async" data-cfasync="false" src="//pl23722004.highrevenuenetwork.com/e8ecdde516e1ce6931b965d75fbec896/invoke.js"></script>

      <link rel="icon" href="\iconmonstr-file-34.svg"></link>
    
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

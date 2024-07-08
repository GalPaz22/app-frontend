'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Head from 'next/head';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

const titles = {
  en: "100% Free ChatPDF - no registration required",
  he: "ChatPDF חינם לגמרי - ללא רישום",
};

const descriptions = {
  en: "Poor UI, High performance.",
  he: "ממשק גרוע, ביצועים גבוהים.",
};

const keywords = {
  en: "chatbot, pdf, free, no registration required",
  he: "צ'אטבוט, pdf, חינם, ללא רישום",
};

export default function RootLayout({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.includes('he')) {
      setLanguage('he');
    } else {
      setLanguage('en');
    }
  }, []);

  return (
    <html lang={language}>
      <Head>
        <title>{titles[language]}</title>
        <meta name="description" content={descriptions[language]} />
        <meta name="keywords" content={keywords[language]} />
        <link rel="icon" href="/iconmonstr-file-34.svg" />
        <script async="async" data-cfasync="false" src="//pl23722004.highrevenuenetwork.com/e8ecdde516e1ce6931b965d75fbec896/invoke.js"></script>
      </Head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div dir="ltr" className="flex flex-col items-center justify-center py-2 responsive">
      <main className="flex flex-col items-center justify-center min-h-screen flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Welcome to{" "}
          <a href="/ask" className="text-blue-600">
            Free AI Toolkit
          </a>
          <br />
        </h1>
        <div className="flex flex-col items-center">
          <svg
            className="animate-bounce w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </main>
      <section className="px-8 py-4 max-w-2xl mx-auto mb-10">
        <span className="mt-3 text-2xl leading-relaxed font-bold">
          So, how does it work?
        </span>
        <p className="mt-3 text-lg leading-relaxed">
          Pretty simple - it's a Q&A bot based on Claude 3 sonnet by Anthropic - 
          the best model in the world for document analysis (as of today). All you need 
          to do is choose a document, write the action you want the model to perform, 
          and wait a few seconds.
        </p>
        <br />

        <span className="mt-3 text-2xl leading-relaxed font-bold">
          And how do you use the chatbot?
        </span>
        <p className="mt-3 text-lg leading-relaxed">
        Just pick yourself a PDF document, press 'Upload and Embed,' and wait a few seconds as the document is upserted to the database. Then, ask whatever you want the model to do. If you want to pick a new document, we recommend cleaning the database to prevent mistakes.
        </p>
        <br />
        
      
        
        <span className="mt-3 text-2xl leading-relaxed font-bold">
          I'm convinced! How do I get started?
        </span>
        <a className="mt-3 text-lg mr-2 leading-relaxed underline" href="/ask"> Great! Click here to get started!</a>
      </section>
    </div>
  );
}

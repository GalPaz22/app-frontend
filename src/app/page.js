"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div dir="rtl" className="flex flex-col items-center justify-center py-2 responsive">
      <main className="flex flex-col items-center justify-center min-h-screen flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
        ברוכים הבאים ל-{" "}
          <a href="/ask" className="text-blue-600">
            Askit
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
      <section className="px-8 py-4 max-w-2xl mx-auto mb-10 ">
        <span className="mt-3 text-2xl leading-relaxed font-bold">
          אז איך זה עובד?
        </span>
        <p className="mt-3 text-lg leading-relaxed ">
          המודל הוא פשוט - מדובר בבוט Q&A מבוסס Claude 3 sonnet של אנת'רופיק -
          המודל הטוב ביותר בעולם לניתוח מסמכים (נכון להיום). כל מה שאתם צריכים 
          לעשות זה לבחור מסמך, לכתוב את הפעולה שאתם מעוניינים שהמודל יבצע
          ולחכות כמה שניות.
        </p>
        <br />
    
    <span className="mt-3 text-2xl leading-relaxed font-bold">
      ואיך משתמשים בצ'אט בוט?
    </span>
    <p className="mt-3 text-lg leading-relaxed ">
      בגדול, פשוט טענו מסמך PDF ובקשו כל מה שתרצו - סיכומים, הבהרות, השוואות או ניתוחי גרפים - הוא מסוגל להכל. 
      ככל שתדייקו את הבקשה שלכם ותהפכו אותה לברורה יותר, כך התוצאה שתקבלו תהיה טובה יותר.
      קחו בחשבון שגם חיבור חזק לאינטרנט משפיע על הביצועים.
    </p>
    <br />
    <span className="mt-3 text-2xl leading-relaxed mb font-bold">
      למה שלא אקנה משתמש אחד ואעביר בין כל החברים?
    </span>
    <p className="mt-3 text-lg leading-relaxed">
המערכת יודעת לזהות כניסה מקבילה של משתמש יחיד ותחסום את הבקשות בהתאם. ניסיונות מרובים להכנס במקביל יובילו למחיקת המשתמש מהדאטאבייס.
    </p>
    <br />
    <span className="mt-3 text-2xl leading-relaxed mb font-bold">
      השתכנעתי! איך מתחילים?    
    </span>
    <a className="mt-3 text-lg mr-2 leading-relaxed underline" href="/ask">איזה כיף. לחצו כאן כדי להתחיל!</a>
</section>
    </div>
  );
}
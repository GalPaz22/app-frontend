// components/Navbar.js
'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { href: "/ask", label: "ChatPDF" },
    { href: "/About", label: "About Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/faq", label: "FAQ" }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-700 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-white text-2xl font-bold cursor-pointer">
            100% Free ChatPDF
          </div>
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        <div className={`md:flex ${isOpen ? "block" : "hidden"} w-full md:w-auto md:space-x-8`}>
          <div className="flex flex-col md:flex-row">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-white font-bold cursor-pointer hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-gray-300 pb-1 ${router.pathname === item.href ? "border-gray-300" : ""} md:pb-0 md:mr-4`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

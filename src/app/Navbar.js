// components/Navbar.js
'use client';
import Link from "next/link";
import Logout from "./Logout";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  
  const navItems = [
    { href: "/ask", label: "ChatPDF" },
    { href: "/About", label: "About Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/faq", label: "FAQ" }
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-700  py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-white text-2xl font-bold cursor-pointer">
            100% Free ChatPDF
          </div>
        </Link>

        <div className="flex space-x-8">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}>
              <span
                className={`text-white font-bold cursor-pointer hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-gray-300 pb-1 ${router.pathname === item.href ? "border-gray-300" : ""}`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        
    
      </div>
    </nav>
  );
};

export default Navbar;

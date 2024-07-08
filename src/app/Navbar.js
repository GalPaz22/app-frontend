// components/Navbar.js
import Link from "next/link";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-white text-2xl font-bold">100% Free ChatPDF</div>
        </Link>
        
        <div className="flex justify-center space-x-8">
          <Link href="/ask">
            <span className="text-white font-bold cursor-pointer hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-gray-300 pb-1">
              ChatPDF
            </span>
          </Link>
          <Link href="/About">
            <span className="text-white cursor-pointer hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-gray-300 pb-1">
              About Us
            </span>
          </Link>

          <Link href="/privacy-policy">
            <span className="text-white cursor-pointer hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-gray-300 pb-1">
              Privacy Policy
            </span>
          </Link>
          <Link href="/faq">
            <span className="text-white cursor-pointer hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-gray-300 pb-1">
              FAQ
            </span>
          </Link>
        </div>

       
      </div>
    </nav>
  );
};

export default Navbar;

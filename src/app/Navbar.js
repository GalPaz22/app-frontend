// components/Navbar.js
import Link from "next/link";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-bold">AI Tool Kit</div>
        <div className="flex justify-center space-x-8">
          <Link href="/chat">
            <span className="text-white cursor-pointer hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-gray-300 pb-1">
              Chat
            </span>
          </Link>

          <Link href="/ask">
            <span className="text-white cursor-pointer hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-gray-300 pb-1">
              Ask
            </span>
          </Link>
        </div>

        <Logout />
      </div>
    </nav>
  );
};

export default Navbar;

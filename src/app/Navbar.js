// components/Navbar.js
import Link from "next/link";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-bold">AI Tool Kit</div>
        <div className="flex justify-center space-x-8">
        </div>

        <Logout />
      </div>
    </nav>
  );
};

export default Navbar;

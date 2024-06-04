// components/Navbar.js
'use client';
import Link from 'next/link';


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">My Chat App</div>
        <div className="space-x-4">
          <Link href="/chat" className="text-white hover:text-gray-300">Chat</Link>
          <Link href="/ask" className="text-white hover:text-gray-300">Ask</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

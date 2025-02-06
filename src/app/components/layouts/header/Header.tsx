import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          BBS APP
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors">
                ホーム
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

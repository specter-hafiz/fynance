import React from "react";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <section className="padding fixed top-0 left-0 right-0 bg-background z-50 py-4 shadow-md">
      <nav className="flex items-center justify-between">
        <div className="p-2 bg-green rounded-lg w-[32px] h-[32px] flex items-center gap-4">
          <Image src="/images/fynance.png" width={24} height={24} alt="Logo" />
          <span className="text-white font-medium text-base sm:text-xl">
            Fynance
          </span>
        </div>
        <div className="flex sm:gap-4 gap-2">
          <Link
            href="/dashboard"
            className="py-1 px-4 bg-lightblue text-black rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="py-1 px-4 bg-green text-black rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;

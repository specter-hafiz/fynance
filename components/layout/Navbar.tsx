import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../ui/Logo";
const Navbar = () => {
  return (
    <section className="padding fixed top-0 left-0 right-0 bg-background z-50 py-4 shadow-md">
      <nav className="flex items-center justify-between">
        <Logo />
        <div className="flex sm:gap-4 gap-2">
          <Link
            href="/login"
            className="py-1 px-4 bg-lightblue text-black rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition"
          >
            Sign in
          </Link>
          <Link
            href="/register"
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

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="padding py-16 sm:py20">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div>
          <div className="flex gap-1 items-center">
            <Image
              src="/images/fynance.png"
              width={24}
              height={24}
              alt="Logo"
              className="object-cover bg-green p-1 rounded-md"
            />

            <h2 className="text-white text-sm sm:text-base font-medium">
              Fynance
            </h2>
          </div>
          <h2 className="font-medium text-white text-lg sm:text-xl mt-4">
            Join Our Newsletter
          </h2>

          <p className="text-lightgray/80 text-xs sm:text-sm max-w-xs mt-4">
            Receive latest updates and news. Enter your email address to
            subscribe.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-start">
          <div>
            <h2 className="text-white text-sm sm:text-base font-medium">
              COMPANY
            </h2>
            <ul>
              <li className="text-lightgray/80 hover:text-white transition-colors">
                <Link href="">ABOUT US</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-sm sm:text-base font-medium">
              CONTACT
            </h2>
            <ul>
              <li>
                <Link href="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

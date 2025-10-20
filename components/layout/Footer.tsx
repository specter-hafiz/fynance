import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="padding py-16 sm:py-20 bg-background">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {/* Newsletter Section */}
        <div>
          <Link
            href="/"
            className="flex gap-2 items-center mb-6 w-fit hover:opacity-90 transition-opacity"
          >
            <div className="bg-green p-1.5 rounded-lg flex items-center justify-center">
              <Image
                src="/images/fynance.png"
                width={24}
                height={24}
                alt="Fynance Logo"
              />
            </div>
            <span className="text-white text-base sm:text-lg font-medium">
              Fynance
            </span>
          </Link>

          <h3 className="font-medium text-white text-lg sm:text-xl mb-3">
            Join Our Newsletter
          </h3>

          <p className="text-lightgray/80 text-sm max-w-xs mb-6">
            Receive latest updates and news. Enter your email address to
            subscribe.
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              required
              className="bg-lightblue/5 border border-lightblue/10 rounded-full py-3 px-6 text-sm text-white placeholder-lightgray/60 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all w-full sm:max-w-xs"
            />
            <button
              type="submit"
              className="bg-green rounded-full py-3 px-8 text-black text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Company Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-lightgray/80 hover:text-green transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-lightgray/80 hover:text-green transition-colors text-sm"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-lightgray/80 hover:text-green transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-lightgray/80 hover:text-green transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:fynance.support@gmail.com"
                  className="text-lightgray/80 hover:text-green transition-colors text-sm break-all"
                >
                  fynance.support@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+233501234567"
                  className="text-lightgray/80 hover:text-green transition-colors text-sm"
                >
                  +233 50 123 4567
                </a>
              </li>
              <li>
                <address className="text-lightgray/80 text-sm not-italic">
                  Atta Kwame, Ghana
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-lightblue/10 mt-12 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lightgray/80 text-xs sm:text-sm">
            © 2025 Fynance. All rights reserved.
          </p>
          <p className="text-lightgray/80 text-xs sm:text-sm">
            Designed by RealTime
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

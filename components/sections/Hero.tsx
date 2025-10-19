import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="padding h-auto pt-32 w-full">
      <div className="flex flex-col sm:flex-row items-center sm:gap-12 gap-6">
        <div className="flex-1 flex flex-col">
          <h1 className="max-w-xs sm:max-w-md md:max-w-lg font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
            Take Control of Your{" "}
            <span className="text-green">Financial Future</span>
          </h1>
          <p className="text-sm sm:text-base max-w-xl pb-12">
            Smart budgeting, expense tracking, and financial insights all in one
            place. Join thousands of users who trust Fynance to achieve their
            financial goals.
          </p>
          <div>
            <Link
              href="/onboarding/welcome"
              className="bg-green text-black py-2 px-8 sm:px-16 rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1"
            >
              Get Started Free
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full relative sm:aspect-auto sm:min-h-[400px]">
          <Image
            src="/images/hero.png"
            alt="Fynance app dashboard preview showing budget tracking and financial insights"
            width={600}
            height={400}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";

const GetStarted = () => {
  return (
    <section className="padding py-16 sm:py-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 g p-6 sm:p-8">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-lightgray/80 text-sm sm:text-base max-w-md">
            Join thousands of users who have already transformed their financial
            lives with Fynance. It&apos;s completely free to get started.
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3">
          <Link
            href="/onboarding/welcome"
            className="inline-flex items-center w-full justify-center gap-2 bg-green rounded-full py-3 px-8 text-black text-sm sm:text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Get Started Free <ChevronRight className="w-4 h-4" />
          </Link>
          <p className="text-lightgray/80 text-xs sm:text-sm font-regular">
            No credit card needed. Free forever plan available.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;

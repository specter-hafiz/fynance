import React from "react";
import Link from "next/link";
import BenefitCard from "../ui/BenefitCard";
import { ChevronRight } from "lucide-react";

const benefits = [
  {
    id: "benefit1",
    src: "/images/home1.png",
    description: "Cut their monthly expenses by 70%",
    alt: "Visual representation of reduced expenses showing significant cost savings",
  },
  {
    id: "benefit2",
    src: "/images/home2.png",
    description: "Started saving money for their goals and dreams",
    alt: "Illustration of growing savings and achieving financial goals",
  },
  {
    id: "benefit3",
    src: "/images/home3.png",
    description: "Built better budgeting habits",
    alt: "Dashboard showing improved spending patterns and budget tracking",
  },
];

const Benefits = () => {
  return (
    <section className="padding py-16 sm:py-20">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8">
        In the <span className="text-green">first month</span> of using Fynance,
        most budgeters:
      </h2>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12`}
      >
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            id={benefit.id}
            image={benefit.src}
            description={benefit.description}
            alt={benefit.alt}
          />
        ))}
      </div>

      <div className="flex flex-col items-start sm:flex-row justify-between sm:items-center border border-lightblue/10 bg-lightblue/5 rounded-lg p-6 sm:p-8 gap-6 hover:bg-lightblue/10 hover:border-lightblue/20 transition-all duration-200">
        <h3 className="text-xl sm:text-2xl md:text-3xl leading-tight font-medium max-w-2xl">
          With Fynance,
          <br /> you'll{" "}
          <span className="text-green">tell your money where to go,</span>{" "}
          instead of wondering where it went
        </h3>

        <Link
          href="/onboarding/welcome"
          className="inline-flex items-center gap-1 bg-green py-4 px-8 rounded-full text-black hover:opacity-90 transition-opacity text-sm sm:text-base font-medium whitespace-nowrap"
        >
          Get Started Free <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default Benefits;

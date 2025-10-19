import React from "react";
import { DatabaseZap, Shapes, Smile, Target } from "lucide-react";
import FeatureCard from "../ui/FeatureCard";

const Features = () => {
  const features = [
    {
      id: "financial-goals",
      icon: Target,
      title: "Set clear financial goals",
      description:
        "Define what you're working towards - track your progress along the way.",
    },
    {
      id: "debt-tracking",
      icon: DatabaseZap,
      title: "Track debts with confidence",
      description:
        "Manage repayments plans, interest rates, and due dates in one convenient place.",
    },
    {
      id: "financial-spaces",
      icon: Shapes,
      title: "Organize separate financial spaces",
      description:
        "Easily manage different parts of your financial life without confusion.",
    },
    {
      id: "effortless-control",
      icon: Smile,
      title: "Stay in control, effortlessly",
      description:
        "Understand your money without spreadsheets or financial jargon.",
    },
  ];

  return (
    <section className="padding py-16 sm:py-20">
      <div className="text-center mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4">
          Everything you need to manage your{" "}
          <span className="text-green">finances</span>
        </h2>
        <p className="text-sm sm:text-base text-lightgray max-w-2xl mx-auto">
          Powerful features designed to help you take control of your financial
          journey
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;

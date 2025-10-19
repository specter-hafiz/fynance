import React from "react";
import { LucideIcon } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-6 border border-lightblue/10 rounded-lg bg-lightblue/5 w-full h-full hover:bg-lightblue/10 hover:border-lightblue/20 transition-all duration-200 group">
      <div className="bg-green/30 mb-4 w-12 h-12 flex items-center justify-center rounded-lg group-hover:bg-green/40 transition-colors duration-200">
        <Icon size={24} className="text-green" />
      </div>
      <h3 className="font-medium text-base sm:text-lg mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-sm text-lightgray leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;

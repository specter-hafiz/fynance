import React from "react";
import Image from "next/image";
const BenefitCard = ({
  id,
  image,
  description,
  alt,
}: {
  id: string;
  image: string;
  description: string;
  alt: string;
}) => {
  return (
    <div
      className={`flex items-center gap-3 ${
        id === "benefit2" ? "flex-row-reverse sm:flex-row" : ""
      }`}
    >
      <Image src={image} alt={alt} width={150} height={180} />
      <h3 className="text-sm sm:text-base font-medium max-w-[180px] leading-relaxed">
        {description}
      </h3>
    </div>
  );
};

export default BenefitCard;

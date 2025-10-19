import React from "react";
import Image from "next/image";
const BenefitCard = ({
  image,
  description,
  alt,
}: {
  image: string;
  description: string;
  alt: string;
}) => {
  return (
    <div className="flex items-center gap-3 ">
      <Image src={image} alt={alt} width={150} height={180} />
      <h3 className="text-sm sm:text-base font-medium max-w-[180px] leading-relaxed">
        {description}
      </h3>
    </div>
  );
};

export default BenefitCard;

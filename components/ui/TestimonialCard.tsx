import React from "react";
import Image from "next/image";

interface TestimonialCardProps {
  image: string;
  quote: string;
  alt: string;
  feedback: string;
  name: string;
}

const TestimonialCard = ({
  image,
  alt,
  quote,
  feedback,
  name,
}: TestimonialCardProps) => {
  return (
    <div className="bg-lightblue/5 border border-lightblue/10 p-6 rounded-lg hover:bg-lightblue/10 hover:border-lightblue/20 transition-all duration-300 flex flex-col">
      <div className="flex gap-4 items-center mb-4">
        <Image
          src={image}
          alt={alt}
          width={64}
          height={64}
          className="rounded-sm object-cover"
        />
        <p className="font-medium text-base">{name}</p>
      </div>
      <blockquote className="text-green font-medium text-lg sm:text-xl mb-4 leading-tight">
        {quote}
      </blockquote>
      <p className="text-lightgray text-sm sm:text-base leading-relaxed">
        {feedback}
      </p>
    </div>
  );
};

export default TestimonialCard;

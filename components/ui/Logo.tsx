import React from "react";
import Image from "next/image";
const Logo = () => {
  return (
    <div className="p-2 bg-green rounded-lg w-[32px] h-[32px] flex items-center gap-4">
      <Image src="/images/fynance.png" width={24} height={24} alt="Logo" />
      <span className="text-white font-medium text-base sm:text-xl">
        Fynance
      </span>
    </div>
  );
};

export default Logo;

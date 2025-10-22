import React from "react";
import { ArrowUpDown, ChevronDown, Pencil, Plus } from "lucide-react";
import ProfileAvatar from "@/components/auth/ProfileAvatar";

const Debts = () => {
  return (
    <div className="flex flex-col flex-1">
      {/* Fixed Header */}
      <div className="flex-shrink-0 sticky top-0 bg-lightblue/3 border-b border-lightblue/10 px-4 sm:px-8 py-3 backdrop-blur-md z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Debts</h1>
          <ProfileAvatar />
        </div>
      </div>

      {/* filters */}
      <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center px-4 sm:px-8 gap-4 my-8">
        <div className="flex gap-4 flex-wrap">
          <button className="bg-lightblue/3 px-3 py-2 rounded-lg text-sm sm:text-base hover:bg-lightblue/10 transition-colors cursor-pointer">
            Lent <ArrowUpDown className="inline w-4 h-4 mb-1 mx-1" />
          </button>
          <button className="bg-lightblue/3 px-3 py-2 rounded-lg text-sm sm:text-base hover:bg-lightblue/10 transition-colors cursor-pointer">
            All currencies <ChevronDown className="inline w-4 h-4 mb-1 mx-1" />
          </button>
          <button className="bg-lightblue/3 px-3 py-2 rounded-lg text-sm sm:text-base hover:bg-lightblue/10 transition-colors cursor-pointer">
            Active <ChevronDown className="inline w-4 h-4 mb-1 mx-1" />
          </button>
        </div>
        <button className="px-3 py-2 bg-green rounded-full text-black flex items-center gap-2 hover:bg-green/80 transition-colors cursor-pointer text-xs sm:text-sm font-medium">
          <Plus className="w-5 h-5" />
          Add debt
        </button>
      </div>

      {/* money lent */}
      <div className="px-4 sm:px-8 mb-8">
        <h2 className="text-sm sm:text-md md:text-2xl font-medium mb-4">
          I lent
        </h2>
        <div className="bg-lightblue/3 rounded-lg p-6 flex gap-5 flex-col">
          <div className="flex items-center justify-between text-xl sm:text-2xl">
            <h2>
              to <span className="underline font-medium">Katy Perry</span>
            </h2>
            <button className="text-lightgray/20 hover:text-green transition-colors cursor-pointer">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <h2 className="text-base text-lightgray/80">Already paid 0 $</h2>
            <h2 className="text-base text-lightgray/80">
              22,000 $ | Rate 0% | Due date: 22 Jun 2024
            </h2>
          </div>
          {/* progress bar - FIXED */}
          <div className="relative w-full h-6 bg-lightblue/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-green rounded-full transition-all duration-500"
              style={{ width: `0%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
              0%
            </div>
          </div>
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <h2 className="text-base sm:text-xl">Remaining debt</h2>
            <h2 className="text-base sm:text-xl">22,000 $</h2>
          </div>
        </div>
      </div>

      {/* money borrowed */}
      <div className="px-4 sm:px-8 mb-8">
        <h2 className="text-sm sm:text-md md:text-2xl font-medium mb-4">
          I borrowed
        </h2>
        <div className="bg-lightblue/3 rounded-lg p-6 flex gap-5 flex-col">
          <div className="flex items-center justify-between text-xl sm:text-2xl">
            <h2>
              from <span className="underline font-medium">John Doe</span>
            </h2>
            <button className="text-lightgray/20 hover:text-green transition-colors cursor-pointer">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-sm sm:text-md text-medium">
            Min monthly payment 200 $
          </h2>
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <h2 className="text-base text-lightgray/80">
              Already paid 2,920 $
            </h2>
            <h2 className="text-base text-lightgray/80">
              4,000 $ | Rate 0% | Due date: 22 Jun 2024
            </h2>
          </div>
          {/* progress bar - FIXED */}
          <div className="relative w-full h-6 bg-lightblue/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-green rounded-full transition-all duration-500"
              style={{ width: `73%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-black">
              73%
            </div>
          </div>
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <h2 className="text-base sm:text-xl">Remaining debt</h2>
            <h2 className="text-base sm:text-xl">1,080 $</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debts;

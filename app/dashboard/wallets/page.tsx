import ProfileAvatar from "@/components/auth/ProfileAvatar";
import { Banknote, CreditCard, Plus } from "lucide-react";
import React from "react";

const Wallets = () => {
  return (
    <div className="flex flex-col flex-1">
      {/* Fixed Header  */}
      <div className="sticky top-0 bg-lightblue/3 border-b border-lightblue/10 px-4 sm:px-8 py-3 backdrop-blur-md z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Wallets</h1>
          <ProfileAvatar />
        </div>
      </div>
      {/* stats and add button */}
      <div className="px-4 sm:px-8 my-4 sm:my-6 flex items-start justify-between flex-wrap gap-4">
        <div className="flex gap-6 items-center flex-wrap">
          <div>
            <h2 className="text-sm sm:text-md md:text-xl text-lightgray/80">
              Total balance
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-medium mt-1">
              12,340 $
            </p>
          </div>
          <div className="w-[1px] bg-lightgray/20 h-14 " />
          <div className="flex items-center">
            <div className="p-4 bg-lightblue rounded-lg text-black mr-4">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm sm:text-md md:text-xl text-lightgray/80">
                Cards
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl font-medium mt-1">
                208,340 $
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-4 bg-lightblue rounded-lg text-black mr-4">
              <Banknote className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm sm:text-md md:text-xl text-lightgray/80">
                Cash
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl font-medium mt-1">
                208,340 $
              </p>
            </div>
          </div>
        </div>
        <button className="px-3 py-2 bg-green rounded-full text-black flex items-center gap-2 hover:bg-green/80 transition-colors cursor-pointer text-xs sm:text-sm font-medium">
          <Plus className="w-6 h-6 hover:text-green/80 transition-colors" />
          Add new wallet
        </button>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-8 pb-8">
        <div className="bg-lightblue/3 rounded-lg p-3 border border-lightblue/10 hover:shadow-lg hover:border-green transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-center p-2 bg-green text-black rounded-lg w-fit">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-xs text-lightgray/80">visa</h2>
          </div>
          <h2 className="text-sm sm:text-lg font-medium">Monobank</h2>
          <p className="text-sm text-lightgray/80 mb-6">**** 1234</p>
          <h2 className="text-sm sm:text-lg font-bold">143,654 $</h2>
        </div>
        <div className="bg-lightblue/3 rounded-lg p-3 border border-lightblue/10 hover:shadow-lg hover:border-green transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-center p-2 bg-green text-black rounded-lg w-fit">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-xs text-lightgray/80">Mastercard</h2>
          </div>
          <h2 className="text-sm sm:text-lg font-medium">Monobank</h2>
          <p className="text-sm text-lightgray/80 mb-6">**** 1234</p>
          <h2 className="text-sm sm:text-lg font-bold">143,654 $</h2>
        </div>
        <div className="bg-lightblue/3 rounded-lg p-3 border border-lightblue/10 hover:shadow-lg hover:border-green transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-center p-2 bg-green text-black rounded-lg w-fit">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-xs text-lightgray/80">visa</h2>
          </div>
          <h2 className="text-sm sm:text-lg font-medium">Monobank</h2>
          <p className="text-sm text-lightgray/80 mb-6">**** 1234</p>
          <h2 className="text-sm sm:text-lg font-bold">143,654 $</h2>
        </div>
        <div className="bg-lightblue/3 rounded-lg p-3 border border-lightblue/10 hover:shadow-lg hover:border-green transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-center p-2 bg-green text-black rounded-lg w-fit">
              <Banknote className="w-5 h-5" />
            </div>
            <h2 className="text-xs text-lightgray/80">cash</h2>
          </div>
          <h2 className="text-sm sm:text-lg font-medium">Monobank</h2>
          <p className="text-sm text-lightgray/80 mb-6">**** 1234</p>
          <h2 className="text-sm sm:text-lg font-bold">143,654 $</h2>
        </div>
      </div>
    </div>
  );
};

export default Wallets;

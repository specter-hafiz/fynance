import React from "react";

const ProfileAvatar = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 rounded-lg hover:bg-lightblue/10 transition-colors cursor-pointer">
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-green/20 flex items-center justify-center text-green font-semibold text-xs sm:text-sm">
        JD
      </div>
      <div className="hidden sm:block flex-1 min-w-0">
        <p className="text-sm font-medium truncate">John Doe</p>
      </div>
    </div>
  );
};

export default ProfileAvatar;

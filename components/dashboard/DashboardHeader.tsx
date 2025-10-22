// app/dashboard/components/DashboardHeader.tsx
import { Plus } from "lucide-react";
import ProfileAvatar from "@/components/auth/ProfileAvatar";

export const DashboardHeader = () => (
  <header className="flex-shrink-0 bg-lightblue/3 border-b border-lightblue/10 px-4 sm:px-8 py-4">
    <div className="flex items-center justify-between">
      <nav className="flex flex-wrap gap-3 sm:gap-5" aria-label="Workspaces">
        <button
          type="button"
          className="border border-green rounded-full px-4 py-2 text-sm text-green hover:bg-green/10 transition-colors"
        >
          Personal space
        </button>
        <button
          type="button"
          className="rounded-full px-4 py-2 text-sm hover:bg-green/10 hover:border hover:text-green border border-transparent transition-colors"
        >
          Work Space
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm text-lightblue/80 hover:text-white underline flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add new
        </button>
      </nav>
      <ProfileAvatar />
    </div>
  </header>
);

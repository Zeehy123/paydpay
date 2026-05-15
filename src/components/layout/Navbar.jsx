import { Search, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar({ role = "Admin" }) {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;

    if (path.includes("users")) return "Users";
    if (path.includes("transactions")) return "Transactions";
    if (path.includes("analytics")) return "Analytics";
    if (path.includes("settings")) return "Settings";

    return "Dashboard";
  };

  return (
    <div className="w-full h-16 bg-[#0a1520] border-b border-[#1a2d40] px-6 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <h1 className="text-white text-lg font-semibold">{getTitle()}</h1>

        <span className="text-xs px-2 py-1 rounded-md bg-[#00d4ff20] text-[#00d4ff] font-medium">
          {role}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 bg-[#0d1b2a] border border-[#1a2d40] rounded-lg px-3 py-2 w-64">
          <Search size={14} className="text-[#4a6a80]" />
          <input
            type="text"
            placeholder="Quick search..."
            className="bg-transparent outline-none text-sm text-white placeholder-[#4a6a80] w-full"
          />
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#1a2d40] bg-[#0d1b2a] hover:border-[#2a4a60] transition">
            <Bell size={16} className="text-[#7a9ab0]" />
          </div>

          <span className="absolute top-1 right-1 w-2 h-2 bg-[#00d4ff] rounded-full"></span>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Search, Bell, X } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar({ role = "Admin" }) {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("users")) return "Users";
    if (path.includes("transactions")) return "Transactions";
    if (path.includes("analytics")) return "Analytics";
    if (path.includes("settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <div className="w-full h-16 bg-[#0a1520] border-b border-[#1a2d40] px-4 md:px-6 flex items-center justify-between gap-3">
      {/* ── LEFT ──────────────────────────────────────────────────── */}
      {/* Hide title when mobile search is open */}
      <div
        className={`flex items-center gap-3 flex-shrink-0 transition-all duration-200 ${searchOpen ? "hidden sm:flex" : "flex"}`}
      >
        <h1 className="text-white text-base md:text-lg font-semibold">
          {getTitle()}
        </h1>
        <span className="text-xs px-2 py-0.5 rounded-md bg-[#00d4ff20] text-[#00d4ff] font-medium hidden xs:inline">
          {role}
        </span>
      </div>

      {/* ── RIGHT ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        {/* Search — full bar on md+, icon-triggered overlay on mobile */}
        <>
          {/* Desktop search bar */}
          <div className="hidden md:flex items-center gap-2 bg-[#0d1b2a] border border-[#1a2d40] rounded-lg px-3 py-2 w-56 lg:w-72 focus-within:border-[#2a4a60] transition-colors">
            <Search size={14} className="text-[#4a6a80] flex-shrink-0" />
            <input
              type="text"
              placeholder="Quick search..."
              className="bg-transparent outline-none text-sm text-white placeholder-[#4a6a80] w-full"
            />
          </div>

          {/* Mobile: expand search inline */}
          {searchOpen ? (
            <div className="flex md:hidden items-center gap-2 bg-[#0d1b2a] border border-[#2a4a60] rounded-lg px-3 py-2 flex-1 max-w-xs animate-in fade-in duration-150">
              <Search size={14} className="text-[#4a6a80] flex-shrink-0" />
              <input
                type="text"
                placeholder="Quick search..."
                autoFocus
                className="bg-transparent outline-none text-sm text-white placeholder-[#4a6a80] w-full"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#4a6a80] hover:text-white flex-shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#1a2d40] bg-[#0d1b2a] hover:border-[#2a4a60] text-[#7a9ab0] transition"
            >
              <Search size={15} />
            </button>
          )}
        </>

        {/* Notification bell */}
        <div className="relative cursor-pointer flex-shrink-0">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#1a2d40] bg-[#0d1b2a] hover:border-[#2a4a60] transition">
            <Bell size={16} className="text-[#7a9ab0]" />
          </div>
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#00d4ff] rounded-full" />
        </div>
      </div>
    </div>
  );
}

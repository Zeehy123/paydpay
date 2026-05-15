import {
  BarChart3,
  ChevronLeft,
  HatGlasses,
  IdCard,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };
  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium";

  return (
    <aside
      className={`h-screen flex flex-col justify-between bg-[#020817] border-r border-slate-800 p-3 transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* logo */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
            <div className="bg-purple-500 p-2 rounded-lg">
              <HatGlasses size={18} />
            </div>

            <h1 className="font-semibold text-purple-200 text-lg">PayDPay</h1>
          </div>
          <ChevronLeft
            size={16}
            className="text-[#4a6a80] cursor-pointer hover:text-white"
          />
        </div>
        <nav className="space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-purple-900/30 text-purple-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-purple-900/30 text-purple-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Users size={18} />
            Users
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-purple-900/30 text-purple-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <IdCard size={18} />
            Transaction
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-purple-900/30 text-purple-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <BarChart3 size={18} />
            Analytics
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-purple-900/30 text-purple-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>
      </div>
      {/* user section */}
      <div className="space-y-4">
        <div className="bg-gray-100 flex items-center justify-between dark:bg-slate-800 p-3 rounded-xl">
          <span className="inline-block mt-2 text-xs px-2 py-1 bg-green-500 text-white rounded-md">
            USER
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

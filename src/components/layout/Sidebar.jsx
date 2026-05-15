import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  HatGlasses,
  IdCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", end: true, icon: LayoutDashboard, label: "Dashboard" },
  { to: "/users", end: false, icon: Users, label: "Users" },
  { to: "/transactions", end: false, icon: IdCard, label: "Transaction" },
  { to: "/analytics", end: false, icon: BarChart3, label: "Analytics" },
  { to: "/settings", end: false, icon: Settings, label: "Settings" },
];

function SidebarContent({ collapsed, setCollapsed, onClose, isMobile }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const linkClass =
    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition font-medium text-sm";

  return (
    <aside
      className={`h-screen flex flex-col bg-[#020817] border-r border-slate-800 transition-all duration-300
      ${isMobile ? "w-64" : collapsed ? "w-20" : "w-64"}`}
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-purple-500 p-2 rounded-lg flex-shrink-0">
            <HatGlasses size={18} />
          </div>
          {(!collapsed || isMobile) && (
            <h1 className="font-semibold text-purple-200 text-lg truncate">
              PayDPay
            </h1>
          )}
        </div>

        {/* Desktop: collapse toggle | Mobile: close drawer */}
        {isMobile ? (
          <button
            onClick={onClose}
            className="text-[#4a6a80] hover:text-white transition flex-shrink-0"
          >
            <X size={18} />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="text-[#4a6a80] hover:text-white transition flex-shrink-0"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_LINKS.map(({ to, end, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={isMobile ? onClose : undefined}
            title={collapsed && !isMobile ? label : undefined}
            className={({ isActive }) =>
              `${linkClass} ${collapsed && !isMobile ? "justify-center px-0" : ""}
               ${
                 isActive
                   ? "bg-purple-900/30 text-purple-400"
                   : "text-slate-400 hover:bg-slate-800 hover:text-white"
               }`
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            {(!collapsed || isMobile) && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <div className="p-3 border-t border-slate-800 flex-shrink-0">
        <div
          className={`bg-slate-800 rounded-xl p-3 flex items-center
          ${collapsed && !isMobile ? "justify-center" : "justify-between"}`}
        >
          {(!collapsed || isMobile) && (
            <span className="text-xs px-2 py-1 bg-green-500 text-white rounded-md font-semibold">
              USER
            </span>
          )}
          <button
            onClick={handleLogout}
            title="Log out"
            className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* ── Mobile hamburger (shown when drawer is closed) ───────── */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg bg-[#020817] border border-slate-800 text-slate-400 hover:text-white transition"
      >
        <Menu size={18} />
      </button>

      {/* ── Mobile drawer overlay ────────────────────────────────── */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer */}
          <div className="md:hidden fixed inset-y-0 left-0 z-50">
            <SidebarContent
              collapsed={false}
              setCollapsed={setCollapsed}
              onClose={() => setDrawerOpen(false)}
              isMobile={true}
            />
          </div>
        </>
      )}

      {/* ── Desktop sidebar (always visible on md+) ─────────────── */}
      <div className="hidden md:block h-screen flex-shrink-0">
        <SidebarContent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onClose={() => {}}
          isMobile={false}
        />
      </div>
    </>
  );
}

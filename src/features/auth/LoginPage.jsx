import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Zap,
  Shield,
  Building,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ROLES = [
  { id: "Admin", icon: Shield },
  { id: "Manager", icon: Building },
  { id: "User", icon: User },
];

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("hammah@paydpay.io");
  const [password, setPassword] = useState("········");
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState("Admin");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("auth", "true");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin?.(role);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#070e1a] flex flex-col items-center justify-center px-4 sm:px-6 font-sans overflow-hidden">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 sm:opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#1a2d40 1px, transparent 1px), linear-gradient(90deg, #1a2d40 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Logo */}
      <div className="relative flex flex-col items-center mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#00d4aa] to-[#00a8ff] flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-[#00d4aa30]">
          <Zap size={22} className="text-black sm:hidden" fill="black" />
          <Zap size={26} className="text-black hidden sm:block" fill="black" />
        </div>
        <h1 className="text-white text-2xl sm:text-3xl font-black tracking-tight">
          PayDPay
        </h1>
        <p className="text-[#4a6a80] text-xs sm:text-sm mt-1">
          Admin Control Center
        </p>
      </div>

      {/* Card */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#0d1b2a] border border-[#1e3045] rounded-2xl p-5 sm:p-7 shadow-2xl">
        {/* Email */}
        <div className="mb-4 sm:mb-5">
          <label className="block text-[#4a6a80] text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
            Email
          </label>
          <div className="flex items-center gap-3 bg-[#0a1520] border border-[#1e3045] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus-within:border-[#00d4aa] transition-colors">
            <Mail size={14} className="text-[#4a6a80] flex-shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white text-sm placeholder-[#4a6a80] min-w-0"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4 sm:mb-5">
          <label className="block text-[#4a6a80] text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
            Password
          </label>
          <div className="flex items-center gap-3 bg-[#0a1520] border border-[#1e3045] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus-within:border-[#00d4aa] transition-colors">
            <Lock size={14} className="text-[#4a6a80] flex-shrink-0" />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white text-sm placeholder-[#4a6a80] min-w-0"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="text-[#4a6a80] hover:text-white transition-colors flex-shrink-0 p-0.5"
            >
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Role Picker */}
        <div className="mb-5 sm:mb-6">
          <label className="block text-[#4a6a80] text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
            Login As (Demo)
          </label>
          <div className="flex gap-1.5 sm:gap-2">
            {ROLES.map(({ id, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 rounded-xl border text-[11px] sm:text-xs font-semibold transition-all duration-150
                  ${
                    role === id
                      ? "bg-[#00d4aa18] border-[#00d4aa] text-[#00d4aa]"
                      : "bg-transparent border-[#1e3045] text-[#4a6a80] hover:text-white hover:border-[#2a4a60]"
                  }`}
              >
                <Icon size={11} className="flex-shrink-0" />
                <span className="truncate">{id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sign In */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#00d4aa] hover:bg-[#00bfa0] active:scale-[0.98] text-[#070e1a] font-bold text-sm py-3 sm:py-3.5 rounded-xl transition-all duration-150 disabled:opacity-70"
        >
          {loading ? (
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          ) : (
            <Lock size={14} />
          )}
          {loading ? "Authenticating…" : "Sign In"}
        </button>
      </div>

      {/* Footer */}
      <p className="relative text-[#4a6a80] text-xs mt-5 sm:mt-6 text-center px-4">
        Protected by PayDPay Security ·{" "}
        <span className="text-[#00d4aa] font-semibold">2FA Enabled</span>
      </p>
    </div>
  );
}

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
    navigate("/");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin?.(role);
    }, 1000);
  };
  return (
    <div className="relative min-h-screen bg-[#070e1a] flex flex-col items-center justify-center px-4 font-sans overflow-hidden">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#1a2d40 1px, transparent 1px), linear-gradient(90deg, #1a2d40 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Logo */}
      <div className="relative flex flex-col items-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00d4aa] to-[#00a8ff] flex items-center justify-center mb-4 shadow-lg shadow-[#00d4aa30]">
          <Zap size={26} className="text-black" fill="black" />
        </div>
        <h1 className="text-white text-3xl font-black tracking-tight">
          PayDPay
        </h1>
        <p className="text-[#4a6a80] text-sm mt-1">Admin Control Center</p>
      </div>

      {/* Card */}
      <div className="relative w-full max-w-sm bg-[#0d1b2a] border border-[#1e3045] rounded-2xl p-7 shadow-2xl">
        {/* Email */}
        <div className="mb-5">
          <label className="block text-[#4a6a80] text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
            Email
          </label>
          <div className="flex items-center gap-3 bg-[#0a1520] border border-[#1e3045] rounded-xl px-4 py-3 focus-within:border-[#00d4aa] transition-colors">
            <Mail size={14} className="text-[#4a6a80] flex-shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white text-sm placeholder-[#4a6a80]"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-[#4a6a80] text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
            Password
          </label>
          <div className="flex items-center gap-3 bg-[#0a1520] border border-[#1e3045] rounded-xl px-4 py-3 focus-within:border-[#00d4aa] transition-colors">
            <Lock size={14} className="text-[#4a6a80] flex-shrink-0" />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white text-sm placeholder-[#4a6a80]"
            />
            <button
              onClick={() => setShowPw(!showPw)}
              className="text-[#4a6a80] hover:text-white transition-colors flex-shrink-0"
            >
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Role Picker */}
        <div className="mb-6">
          <label className="block text-[#4a6a80] text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
            Login As (Demo)
          </label>
          <div className="flex gap-2">
            {ROLES.map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setRole(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-150
                  ${
                    role === id
                      ? "bg-[#00d4aa18] border-[#00d4aa] text-[#00d4aa]"
                      : "bg-transparent border-[#1e3045] text-[#4a6a80] hover:text-white hover:border-[#2a4a60]"
                  }`}
              >
                <Icon size={12} />
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Sign In */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#00d4aa] hover:bg-[#00bfa0] active:scale-[0.98] text-[#070e1a] font-bold text-sm py-3.5 rounded-xl transition-all duration-150 disabled:opacity-70"
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
      <p className="relative text-[#4a6a80] text-xs mt-6">
        Protected by VaultPay Security ·{" "}
        <span className="text-[#00d4aa] font-semibold">2FA Enabled</span>
      </p>
    </div>
  );
}

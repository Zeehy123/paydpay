import { ToggleLeft, ToggleRight, MoreHorizontal } from "lucide-react";

function RoleBadge({ role }) {
  const styles = {
    Admin: "border border-[#00d4ff60] text-[#00d4ff] bg-[#00d4ff10]",
    Manager: "border border-[#a78bfa60] text-[#a78bfa] bg-[#a78bfa10]",
    User: "border border-[#4a6a8060] text-[#4a6a80] bg-transparent",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-0.5 rounded ${styles[role] || styles.User}`}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "border border-[#00e87a60] text-[#00e87a] bg-[#00e87a10]",
    Inactive: "border border-[#4a6a8060] text-[#4a6a80] bg-transparent",
    Suspended: "border border-[#ff6b6b60] text-[#ff6b6b] bg-[#ff6b6b10]",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-0.5 rounded ${styles[status] || ""}`}
    >
      {status}
    </span>
  );
}

function KycBadge({ kyc }) {
  const styles = {
    Verified: "border border-[#00e87a60] text-[#00e87a] bg-[#00e87a10]",
    Failed: "border border-[#ff6b6b60] text-[#ff6b6b] bg-[#ff6b6b10]",
    Pending: "border border-[#f5a62360] text-[#f5a623] bg-[#f5a62310]",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-0.5 rounded ${styles[kyc] || ""}`}
    >
      {kyc}
    </span>
  );
}

const avatarColors = {
  A: "bg-[#1a3a5c] text-[#00d4ff]",
  B: "bg-[#2a1a4a] text-[#a78bfa]",
  D: "bg-[#1a3a5c] text-[#00d4ff]",
  J: "bg-[#2a3a1a] text-[#00e87a]",
  K: "bg-[#3a1a1a] text-[#ff6b6b]",
  M: "bg-[#1a3a5c] text-[#00d4ff]",
  P: "bg-[#1a3a5c] text-[#00d4ff]",
  S: "bg-[#2a1a4a] text-[#a78bfa]",
  Y: "bg-[#1a2a3a] text-[#60a5fa]",
  Z: "bg-[#3a1a2a] text-[#ff6b6b]",
  L: "bg-[#1a3a2a] text-[#00e87a]",
  N: "bg-[#2a2a1a] text-[#f5a623]",
};

const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
const avatarClass = (name) =>
  avatarColors[name[0].toUpperCase()] || "bg-[#1a2d3a] text-[#7a9ab0]";

/* ── Desktop table row (hidden on mobile) ───────────────────────────── */
export function UserRow({ user, checked, onSelect, onToggleStatus }) {
  return (
    <tr
      className={`border-t border-[#1a2d40] transition-colors hover:bg-[#1a2d4040] ${checked ? "bg-[#00d4aa08]" : "bg-transparent"}`}
    >
      <td className="px-4 py-3.5">
        <div
          onClick={onSelect}
          className={`w-4 h-4 rounded border cursor-pointer flex items-center justify-center transition-colors
            ${checked ? "bg-[#00d4aa] border-[#00d4aa]" : "border-[#2a4a60] bg-transparent"}`}
        >
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </td>
      <td className="px-3 py-3.5">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarClass(user.name)}`}
          >
            {initials(user.name)}
          </div>
          <div>
            <div className="text-white text-sm font-semibold leading-tight">
              {user.name}
            </div>
            <div className="text-[#4a6a80] text-xs mt-0.5">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-3.5">
        <RoleBadge role={user.role} />
      </td>
      <td className="px-3 py-3.5">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-3 py-3.5">
        <KycBadge kyc={user.kyc} />
      </td>
      <td className="px-3 py-3.5 text-[#7a9ab0] text-sm font-mono">
        {user.txns}
      </td>
      <td className="px-3 py-3.5 text-[#00e87a] text-sm font-mono font-semibold">
        {user.balance}
      </td>
      <td className="px-3 py-3.5 text-[#4a6a80] text-sm font-mono">
        {user.joined}
      </td>
      <td className="px-3 py-3.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleStatus(user.id)}
            title={user.status === "Active" ? "Suspend" : "Activate"}
          >
            {user.status === "Active" ? (
              <ToggleRight size={20} className="text-[#00d4aa]" />
            ) : (
              <ToggleLeft size={20} className="text-[#2a4a60]" />
            )}
          </button>
          <button className="text-[#4a6a80] hover:text-white transition-colors">
            <MoreHorizontal size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ── Mobile card (shown only on mobile) ─────────────────────────────── */
export function UserCard({ user, checked, onSelect, onToggleStatus }) {
  return (
    <div
      className={`p-4 border-b border-[#1a2d40] transition-colors ${checked ? "bg-[#00d4aa08]" : "bg-transparent"}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div
          onClick={onSelect}
          className={`w-4 h-4 rounded border cursor-pointer flex items-center justify-center flex-shrink-0 mt-1 transition-colors
            ${checked ? "bg-[#00d4aa] border-[#00d4aa]" : "border-[#2a4a60] bg-transparent"}`}
        >
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {/* Avatar */}
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarClass(user.name)}`}
        >
          {initials(user.name)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-white text-sm font-semibold truncate">
              {user.name}
            </p>
            <button onClick={() => onToggleStatus(user.id)}>
              {user.status === "Active" ? (
                <ToggleRight
                  size={20}
                  className="text-[#00d4aa] flex-shrink-0"
                />
              ) : (
                <ToggleLeft
                  size={20}
                  className="text-[#2a4a60] flex-shrink-0"
                />
              )}
            </button>
          </div>
          <p className="text-[#4a6a80] text-xs mt-0.5 truncate">{user.email}</p>
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <RoleBadge role={user.role} />
            <StatusBadge status={user.status} />
            <KycBadge kyc={user.kyc} />
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
            <span className="text-[#4a6a80]">
              Txns:{" "}
              <span className="text-[#7a9ab0] font-mono">{user.txns}</span>
            </span>
            <span className="text-[#4a6a80]">
              Balance:{" "}
              <span className="text-[#00e87a] font-mono font-semibold">
                {user.balance}
              </span>
            </span>
            <span className="text-[#4a6a80] font-mono">{user.joined}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

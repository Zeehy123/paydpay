import { useState, useMemo } from "react";
import {
  Search,
  Download,
  ArrowUp,
  ArrowUpDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { transactionsData } from "../data/transactions";

const TYPES = ["All", "Deposit", "Withdrawal", "Transfer", "Payment"];

const STATUSES = ["All", "Completed", "Pending", "Failed"];
const PER_PAGE = 5;

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

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function avatarClass(name) {
  const first = name[0].toUpperCase();
  return avatarColors[first] || "bg-[#1a2d3a] text-[#7a9ab0]";
}

function RoleBadge({ role }) {
  const styles = {
    Admin: "border border-[#00d4ff60] text-[#00d4ff]   bg-[#00d4ff10]",
    Manager: "border border-[#a78bfa60] text-[#a78bfa]   bg-[#a78bfa10]",
    User: "border border-[#4a6a8060] text-[#4a6a80]   bg-transparent",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-0.5 rounded ${styles[role] || styles.User}`}
    >
      {role}
    </span>
  );
}

function TypeBadge({ type }) {
  const styles = {
    Deposit: "border border-[#00e87a60] text-[#00e87a] bg-[#00e87a10]",
    Withdrawal: "border border-[#ff6b6b60] text-[#ff6b6b] bg-[#ff6b6b10]",
    Transfer: "border border-[#00d4ff60] text-[#00d4ff] bg-[#00d4ff10]",
    Payment: "border border-[#a78bfa60] text-[#a78bfa] bg-[#a78bfa10]",
  };

  return (
    <span
      className={`text-xs font-semibold px-2.5 py-0.5 rounded ${styles[type]}`}
    >
      {type}
    </span>
  );
}

function TxStatusBadge({ status }) {
  const styles = {
    Completed: "border border-[#00e87a60] text-[#00e87a] bg-[#00e87a10]",
    Pending: "border border-[#f5a62360] text-[#f5a623] bg-[#f5a62310]",
    Failed: "border border-[#ff6b6b60] text-[#ff6b6b] bg-[#ff6b6b10]",
  };

  return (
    <span
      className={`text-xs font-semibold px-2.5 py-0.5 rounded ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function SortIcon({ active, dir }) {
  if (active)
    return (
      <ArrowUp
        size={11}
        className={`inline ml-1 transition-transform ${dir === "desc" ? "rotate-180" : ""}`}
      />
    );
  return <ArrowUpDown size={11} className="inline ml-1 opacity-30" />;
}

export default function TransactionTable() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statFilter, setStatFilter] = useState("All");
  const [selected, setSelected] = useState([]);
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [transaction, setTransaction] = useState(transactionsData);

  const filtered = useMemo(() => {
    let d = [...transaction];
    if (search)
      d = d.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.txid.toLowerCase().includes(search.toLowerCase()),
      );
    if (typeFilter !== "All") d = d.filter((u) => u.type === typeFilter);
    if (statFilter !== "All") d = d.filter((u) => u.status === statFilter);
    d.sort((a, b) => {
      const av = String(a[sortKey] || ""),
        bv = String(b[sortKey] || "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return d;
  }, [transaction, search, typeFilter, statFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const toggleRow = (id) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  const toggleAll = () =>
    setSelected((s) => (s.length === rows.length ? [] : rows.map((r) => r.id)));

  const toggleStatus = (id) =>
    setTransaction((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Completed" ? "Pending" : "Failed" }
          : u,
      ),
    );

  const Th = ({ label, sortable, k, className = "" }) => (
    <th
      onClick={sortable ? () => toggleSort(k) : undefined}
      className={`px-3 py-3 text-left text-[10px] font-semibold tracking-widest uppercase text-[#4a6a80] whitespace-nowrap ${sortable ? "cursor-pointer select-none hover:text-[#7a9ab0]" : ""} ${className}`}
    >
      {label}
      {sortable && <SortIcon active={sortKey === k} dir={sortDir} />}
    </th>
  );

  return (
    <div className="bg-[#0a1520] min-h-screen p-6 font-sans">
      <div className="bg-[#0d1b2a] border border-[#1a2d40] rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 p-4 border-b border-[#1a2d40]">
          <div className="flex items-center gap-2 bg-[#0a1520] border border-[#1a2d40] rounded-lg px-3 py-2 flex-1 max-w-md">
            <Search size={13} className="text-[#4a6a80] flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search transaction..."
              className="bg-transparent outline-none text-white text-sm placeholder-[#4a6a80] w-full"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <select
              value={statFilter}
              onChange={(e) => {
                setStatFilter(e.target.value);
                setPage(1);
              }}
              className="bg-[#0a1520] border border-[#1a2d40] text-[#7a9ab0] text-sm rounded-lg px-3 py-2 outline-none cursor-pointer"
            >
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              className="bg-[#0a1520] border border-[#1a2d40] text-[#7a9ab0] text-sm rounded-lg px-3 py-2 outline-none cursor-pointer"
            >
              {TYPES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <button className="flex items-center gap-2 bg-[#0a1520] border border-[#1a2d40] text-[#7a9ab0] text-sm rounded-lg px-3 py-2 hover:text-white hover:border-[#2a4a60] transition-colors">
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a1520]">
              <tr>
                <th className="px-4 py-3 w-10">
                  <div
                    onClick={toggleAll}
                    className={`w-4 h-4 rounded border cursor-pointer flex items-center justify-center transition-colors ${selected.length === rows.length && rows.length > 0 ? "bg-[#00d4aa] border-[#00d4aa]" : "border-[#2a4a60] bg-transparent"}`}
                  >
                    {selected.length === rows.length && rows.length > 0 && (
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
                </th>
                <Th label="Transaction ID" sortable k="txid" />

                <Th label="User" sortable k="name" />

                <Th label="Type" sortable k="type" />

                <Th label="Status" sortable k="status" />

                <Th label="Amount" sortable k="amount" />

                <Th label="Fee" sortable k="fee" />

                <Th label="Date" sortable k="date" />

                <Th label="Actions" />
              </tr>
            </thead>
            <tbody>
              {rows.map((u, i) => {
                const checked = selected.includes(u.txid);
                return (
                  <tr
                    key={u.txid}
                    className={`border-t border-[#1a2d40] transition-colors ${checked ? "bg-[#00d4aa08]" : i % 2 === 0 ? "bg-transparent" : "bg-[#ffffff03]"} hover:bg-[#1a2d4040]`}
                  >
                    <td className="px-4 py-3.5">
                      <div
                        onClick={() => toggleRow(u.txid)}
                        className={`w-4 h-4 rounded border cursor-pointer flex items-center justify-center transition-colors ${checked ? "bg-[#00d4aa] border-[#00d4aa]" : "border-[#2a4a60]"}`}
                      >
                        {checked && (
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                          >
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
                      <RoleBadge role={u.txid} />
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-white text-sm font-semibold leading-tight">
                            {u.name}
                          </div>
                          <div className="text-[#4a6a80] text-xs mt-0.5">
                            {u.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <RoleBadge role={u.type} />
                    </td>
                    <td className="px-3 py-3.5">
                      <TxStatusBadge status={u.status} />
                    </td>
                    <td className="px-3 py-3.5">
                      <TypeBadge type={u.type} />
                    </td>
                    <td className="px-3 py-3.5 text-[#7a9ab0] text-sm font-mono">
                      {u.fee}
                    </td>
                    <td className="px-3 py-3.5 text-[#00e87a] text-sm font-mono font-semibold">
                      {u.date}
                    </td>

                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleStatus(u.id)}
                          className="transition-colors"
                          title={u.status === "Active" ? "Suspend" : "Activate"}
                        >
                          {u.status === "Active" ? (
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
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#1a2d40]">
          <span className="text-[#4a6a80] text-xs">
            Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–
            {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}{" "}
            transaction
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded border border-[#1a2d40] text-[#4a6a80] hover:text-white hover:border-[#2a4a60] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={13} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 flex items-center justify-center rounded border text-xs font-semibold transition-colors ${p === page ? "bg-[#00d4aa] border-[#00d4aa] text-black" : "border-[#1a2d40] text-[#4a6a80] hover:text-white hover:border-[#2a4a60]"}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded border border-[#1a2d40] text-[#4a6a80] hover:text-white hover:border-[#2a4a60] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

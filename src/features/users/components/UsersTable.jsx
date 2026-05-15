import { useState, useMemo } from "react";
import {
  Search,
  Download,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import { UserRow, UserCard } from "./UsersRow";
import { usersData } from "../data/users";

const ROLES = ["All", "Admin", "Manager", "User"];
const STATUSES = ["All", "Active", "Inactive", "Suspended"];
const PER_PAGE = 5;

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

function Th({ label, sortable, k, sortKey, sortDir, onSort }) {
  return (
    <th
      onClick={sortable ? () => onSort(k) : undefined}
      className={`px-3 py-3 text-left text-[10px] font-semibold tracking-widest uppercase text-[#4a6a80] whitespace-nowrap
        ${sortable ? "cursor-pointer select-none hover:text-[#7a9ab0]" : ""}`}
    >
      {label}
      {sortable && <SortIcon active={sortKey === k} dir={sortDir} />}
    </th>
  );
}

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statFilter, setStatFilter] = useState("All");
  const [selected, setSelected] = useState([]);
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(usersData);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let d = [...users];
    if (search)
      d = d.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()),
      );
    if (roleFilter !== "All") d = d.filter((u) => u.role === roleFilter);
    if (statFilter !== "All") d = d.filter((u) => u.status === statFilter);
    d.sort((a, b) => {
      const av = String(a[sortKey] || ""),
        bv = String(b[sortKey] || "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return d;
  }, [users, search, roleFilter, statFilter, sortKey, sortDir]);

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
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
          : u,
      ),
    );

  const allChecked = selected.length === rows.length && rows.length > 0;

  const FilterControls = () => (
    <>
      <select
        value={statFilter}
        onChange={(e) => {
          setStatFilter(e.target.value);
          setPage(1);
        }}
        className="flex-1 sm:flex-none bg-[#0a1520] border border-[#1a2d40] text-[#7a9ab0] text-sm rounded-lg px-3 py-2 outline-none cursor-pointer"
      >
        {STATUSES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <select
        value={roleFilter}
        onChange={(e) => {
          setRoleFilter(e.target.value);
          setPage(1);
        }}
        className="flex-1 sm:flex-none bg-[#0a1520] border border-[#1a2d40] text-[#7a9ab0] text-sm rounded-lg px-3 py-2 outline-none cursor-pointer"
      >
        {ROLES.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
      <button className="flex items-center gap-2 bg-[#0a1520] border border-[#1a2d40] text-[#7a9ab0] text-sm rounded-lg px-3 py-2 hover:text-white hover:border-[#2a4a60] transition-colors">
        <Download size={13} /> Export
      </button>
    </>
  );

  return (
    <div className="font-sans">
      <div className="bg-[#0d1b2a] border border-[#1a2d40] rounded-2xl overflow-hidden">
        {/* ── Toolbar ─────────────────────────────────────────────── */}
        <div className="p-3 sm:p-4 border-b border-[#1a2d40] space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#0a1520] border border-[#1a2d40] rounded-lg px-3 py-2 flex-1">
              <Search size={13} className="text-[#4a6a80] flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search users..."
                className="bg-transparent outline-none text-white text-sm placeholder-[#4a6a80] w-full min-w-0"
              />
            </div>

            {/* Mobile filter toggle button */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-[#0a1520] border border-[#1a2d40] text-[#7a9ab0] hover:text-white transition flex-shrink-0"
            >
              {filterOpen ? <X size={14} /> : <Filter size={14} />}
            </button>

            {/* Desktop filters */}
            <div className="hidden sm:flex items-center gap-2">
              <FilterControls />
            </div>
          </div>

          {/* Mobile filter drawer */}
          {filterOpen && (
            <div className="sm:hidden flex flex-wrap gap-2">
              <FilterControls />
            </div>
          )}
        </div>

        {/* ── Mobile: UserCard list ────────────────────────────────── */}
        <div className="sm:hidden divide-y divide-[#1a2d40]">
          {rows.map((u) => (
            <UserCard
              key={u.id}
              user={u}
              checked={selected.includes(u.id)}
              onSelect={() => toggleRow(u.id)}
              onToggleStatus={toggleStatus}
            />
          ))}
        </div>

        {/* ── Desktop: UserRow table ───────────────────────────────── */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a1520]">
              <tr>
                <th className="px-4 py-3 w-10">
                  <div
                    onClick={toggleAll}
                    className={`w-4 h-4 rounded border cursor-pointer flex items-center justify-center transition-colors
                      ${allChecked ? "bg-[#00d4aa] border-[#00d4aa]" : "border-[#2a4a60] bg-transparent"}`}
                  >
                    {allChecked && (
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
                {[
                  { label: "Name", k: "name" },
                  { label: "Role", k: "role" },
                  { label: "Status", k: "status" },
                  { label: "KYC", k: "kyc" },
                  { label: "Txns", k: "txns" },
                  { label: "Balance", k: "balance" },
                  { label: "Joined", k: "joined" },
                ].map(({ label, k }) => (
                  <Th
                    key={k}
                    label={label}
                    sortable
                    k={k}
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={toggleSort}
                  />
                ))}
                <Th
                  label="Actions"
                  sortKey={sortKey}
                  sortDir={sortDir}
                  onSort={toggleSort}
                />
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <UserRow
                  key={u.id}
                  user={u}
                  checked={selected.includes(u.id)}
                  onSelect={() => toggleRow(u.id)}
                  onToggleStatus={toggleStatus}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ───────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-t border-[#1a2d40] gap-2">
          <span className="text-[#4a6a80] text-xs flex-shrink-0">
            <span className="hidden sm:inline">Showing </span>
            {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–
            {Math.min(page * PER_PAGE, filtered.length)}
            <span className="hidden sm:inline">
              {" "}
              of {filtered.length} users
            </span>
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
                className={`w-7 h-7 flex items-center justify-center rounded border text-xs font-semibold transition-colors
                  ${p === page ? "bg-[#00d4aa] border-[#00d4aa] text-black" : "border-[#1a2d40] text-[#4a6a80] hover:text-white hover:border-[#2a4a60]"}`}
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

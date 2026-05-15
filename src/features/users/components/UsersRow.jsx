import StatusBadge from "./StatusBadge";
import { MoreHorizontal } from "lucide-react";

export default function UserRow({ user }) {
  return (
    <tr className="border-b border-slate-800 hover:bg-slate-900">
      <td className="p-4">
        <input type="checkbox" />
      </td>

      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center text-xs">
            {user.name.slice(0, 2)}
          </div>

          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
        </div>
      </td>

      <td className="p-4">
        <StatusBadge type="role" value={user.role} />
      </td>

      <td className="p-4">
        <StatusBadge type="status" value={user.status} />
      </td>

      <td className="p-4">
        <StatusBadge type="kyc" value={user.kyc} />
      </td>

      <td className="p-4">{user.txns}</td>

      <td className="p-4 text-green-400">{user.balance}</td>

      <td className="p-4 text-slate-400">{user.joined}</td>

      <td className="p-4">
        <MoreHorizontal size={18} />
      </td>
    </tr>
  );
}

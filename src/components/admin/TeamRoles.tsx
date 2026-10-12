import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { getTeamMembers, setUserRole } from "@/lib/store.functions";

type Member = Awaited<ReturnType<typeof getTeamMembers>>[number];
const roles = [
  { key: "super_admin", label: "Super admin", hint: "Everything + manage team roles" },
  { key: "admin", label: "Admin", hint: "Products, prices, orders, reviews, banners" },
  { key: "staff", label: "Staff", hint: "Team member tag" },
] as const;

export function TeamRoles() {
  const [members, setMembers] = useState<Member[] | null>(null);
  const [allowed, setAllowed] = useState(true);
  const [query, setQuery] = useState("");
  const load = () => getTeamMembers().then(setMembers).catch(() => setAllowed(false));
  useEffect(() => { void load(); }, []);
  if (!allowed) return null;

  const visible = (members ?? []).filter((m) => m.email.toLowerCase().includes(query.toLowerCase()));
  return (
    <section id="team" className="mt-10 rounded-lg border border-border p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2"><Users className="size-5 text-leaf" /><h2 className="font-display text-2xl">Team & roles</h2></div>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by email" className="max-w-xs" aria-label="Search users" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">The person must first create an account on the website. Then tick the role here — it applies on their next page load.</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-muted-foreground"><th className="py-2 pr-4">Email</th>{roles.map((r) => <th key={r.key} className="px-3 py-2" title={r.hint}>{r.label}</th>)}</tr></thead>
          <tbody>
            {members === null ? <tr><td className="py-4" colSpan={4}>Loading…</td></tr> : visible.map((m) => (
              <tr key={m.id} className="border-b border-border/60">
                <td className="py-2 pr-4">{m.email}{m.is_self ? " (you)" : ""}</td>
                {roles.map((r) => (
                  <td key={r.key} className="px-3 py-2 text-center">
                    <input type="checkbox" aria-label={`${r.label} for ${m.email}`} className="size-4 accent-primary" checked={m.roles.includes(r.key)} disabled={m.is_self && r.key === "super_admin"}
                      onChange={async (e) => { try { await setUserRole({ data: { userId: m.id, role: r.key, enabled: e.target.checked } }); toast.success("Role updated"); load(); } catch (err) { toast.error(err instanceof Error ? err.message : "Role could not be updated"); } }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

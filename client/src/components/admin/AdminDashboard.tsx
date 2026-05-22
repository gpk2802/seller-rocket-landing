import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Filter, KeyRound, Loader2, LogOut, MoreHorizontal, RefreshCw, Search, ShieldCheck, Trash2 } from "../ui/icons";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "../../lib/utils";
import { ApiError, api } from "../../lib/api";
import { leadStatuses, platforms, type Lead, type LeadStatus, type Platform } from "../../types";

type PlatformFilter = Platform | "All";

const statusVariant: Record<LeadStatus, "neutral" | "warning" | "success" | "danger" | "gold"> = {
  New: "neutral",
  Contacted: "warning",
  Qualified: "gold",
  "Proposal Sent": "success",
  Closed: "danger"
};

const statusTone: Record<LeadStatus, string> = {
  New: "border-slate-200 bg-slate-50 text-slate-700",
  Contacted: "border-amber-200 bg-amber-50 text-amber-700",
  Qualified: "border-brand-gold/60 bg-brand-gold/20 text-brand-mutedGold",
  "Proposal Sent": "border-emerald-200 bg-emerald-50 text-emerald-700",
  Closed: "border-slate-200 bg-slate-100 text-slate-600"
};

const platformFilters: PlatformFilter[] = ["All", ...platforms];
const navItems = ["Overview", "Leads", "Services", "Case Studies", "Testimonials", "Settings"];
const ADMIN_STORAGE_KEY = "sellerrocket_admin_key";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function normalize(value: unknown, fallback = "Not captured") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export function AdminDashboard() {
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hasAdminAccess, setHasAdminAccess] = useState(() => {
    return typeof window !== "undefined" && Boolean(window.sessionStorage.getItem(ADMIN_STORAGE_KEY));
  });
  const [adminKeyInput, setAdminKeyInput] = useState("");
  const [loading, setLoading] = useState(hasAdminAccess);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    if (!hasAdminAccess) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await api.listLeads(platformFilter);
      setLeads(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to load leads.";
      if (err instanceof ApiError && err.status === 401) {
        window.sessionStorage.removeItem(ADMIN_STORAGE_KEY);
        setHasAdminAccess(false);
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [hasAdminAccess, platformFilter]);

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    const handler = () => {
      void fetchLeads();
    };
    window.addEventListener("sellerrocket:lead-created", handler);
    return () => window.removeEventListener("sellerrocket:lead-created", handler);
  }, [fetchLeads]);

  const filteredLeads = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return leads;

    return leads.filter((lead) => {
      const searchable = [
        lead.name,
        lead.email,
        lead.phone,
        lead.website,
        lead.platform,
        lead.revenue_range,
        lead.service_interest,
        lead.status
      ]
        .map((value) => normalize(value, "").toLowerCase())
        .join(" ");

      return searchable.includes(query);
    });
  }, [leads, searchQuery]);

  const totalByStatus = useMemo(() => {
    return leadStatuses.reduce<Record<LeadStatus, number>>((acc, status) => {
      acc[status] = leads.filter((lead) => lead.status === status).length;
      return acc;
    }, { New: 0, Contacted: 0, Qualified: 0, "Proposal Sent": 0, Closed: 0 });
  }, [leads]);

  const updateStatus = async (lead: Lead, status: LeadStatus) => {
    if (lead.status === status) return;
    setUpdatingId(lead.id);
    try {
      const updated = await api.updateLeadStatus(lead.id, status);
      setLeads((current) => current.map((item) => (item.id === lead.id ? updated : item)));
      toast.success("Lead status updated");
    } catch (err) {
      toast.error("Could not update status", {
        description: err instanceof Error ? err.message : "Please try again."
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteLead = async (lead: Lead) => {
    const confirmed = window.confirm(`Delete lead for ${lead.name}?`);
    if (!confirmed) return;

    setUpdatingId(lead.id);
    try {
      await api.deleteLead(lead.id);
      setLeads((current) => current.filter((item) => item.id !== lead.id));
      toast.success("Lead deleted");
    } catch (err) {
      toast.error("Could not delete lead", {
        description: err instanceof Error ? err.message : "Please try again."
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const submitAdminKey = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = adminKeyInput.trim();

    if (!value) {
      toast.error("Enter the admin access key.");
      return;
    }

    window.sessionStorage.setItem(ADMIN_STORAGE_KEY, value);
    setHasAdminAccess(true);
    setError(null);
  };

  const signOut = () => {
    window.sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setHasAdminAccess(false);
    setAdminKeyInput("");
    setLeads([]);
  };

  if (!hasAdminAccess) {
    return (
      <section id="admin" className="min-h-screen bg-brand-cream px-3 py-16">
        <div className="container flex min-h-[72vh] items-center justify-center">
          <form
            onSubmit={submitAdminKey}
            className="w-full max-w-md rounded-[1.75rem] border border-brand-line bg-white p-6 shadow-brand-lift"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-deep text-brand-gold">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <Badge variant="outline" className="mb-4 bg-white text-brand-navy">Admin access</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-brand-deep">Seller Rocket CRM</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Enter the admin key from your Vercel environment variables to view and manage incoming leads.
            </p>
            {error ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800">
                {error}
              </div>
            ) : null}
            <div className="mt-6 space-y-2">
              <label htmlFor="admin-key" className="text-sm font-bold text-brand-deep">Admin key</label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="admin-key"
                  type="password"
                  value={adminKeyInput}
                  onChange={(event) => setAdminKeyInput(event.target.value)}
                  placeholder="Enter ADMIN_API_KEY"
                  className="pl-10"
                  autoComplete="current-password"
                />
              </div>
            </div>
            <Button type="submit" variant="gold" size="lg" className="mt-5 w-full rounded-full">
              Open Admin Dashboard
            </Button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="bg-brand-cream py-20 lg:py-28">
      <div className="container">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <Badge variant="outline" className="mb-4 bg-white text-brand-navy">Admin dashboard</Badge>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-brand-deep md:text-5xl">
              Lead pipeline built for fast follow-up.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              A clean operating view for enquiries, platform intent, revenue range, service interest, and sales status.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-line bg-white p-4 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search brand, contact, service, status"
                  className="pl-10"
                />
              </div>
              <Button variant="subtle" onClick={() => void fetchLeads()} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                Refresh
              </Button>
              <Button variant="outline" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {platformFilters.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => setPlatformFilter(platform)}
                  className={cn(
                    "rounded-full border px-3 py-2 text-xs font-bold transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45",
                    platformFilter === platform
                      ? "border-brand-gold bg-brand-gold text-brand-deep shadow-gold-glow"
                      : "border-brand-line bg-brand-cream text-slate-600 hover:border-brand-gold"
                  )}
                  aria-pressed={platformFilter === platform}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-brand-line bg-white shadow-brand-lift">
          <div className="grid lg:grid-cols-[240px_1fr]">
            <aside className="border-b border-brand-line bg-brand-deep p-4 text-white lg:border-b-0 lg:border-r">
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold text-brand-deep">
                  <BarChart3 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold">Seller Rocket</p>
                  <p className="text-xs text-white/52">Growth CRM</p>
                </div>
              </div>
              <nav className="grid gap-1">
                {navItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold transition",
                      item === "Leads" ? "bg-white text-brand-deep" : "text-white/62 hover:bg-white/8 hover:text-white"
                    )}
                  >
                    {item}
                    {item === "Leads" ? <span className="rounded-full bg-brand-gold px-2 py-0.5 text-[11px] text-brand-deep">{leads.length}</span> : null}
                  </button>
                ))}
              </nav>
            </aside>

            <div className="min-w-0">
              <div className="border-b border-brand-line p-5">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  {leadStatuses.map((status) => (
                    <motion.div key={status} layout className="rounded-2xl border border-brand-line bg-brand-cream p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className={cn("rounded-full border px-2.5 py-1 text-xs font-bold", statusTone[status])}>{status}</span>
                        <span className="text-2xl font-bold text-brand-deep">{totalByStatus[status]}</span>
                      </div>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Current view</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-b border-brand-line bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-brand-deep">Leads</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {platformFilter === "All" ? "Showing all platforms" : `Filtered by ${platformFilter}`} · {filteredLeads.length} records
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-brand-line bg-brand-cream px-3 py-2 text-xs font-bold text-slate-600">
                  <Filter className="h-4 w-4" />
                  Pipeline filters active
                </div>
              </div>

              <div className="p-0" aria-busy={loading}>
                {loading ? (
                  <div className="space-y-3 p-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="h-16 animate-pulse rounded-2xl bg-muted" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="p-6">
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
                      <p className="font-semibold">Unable to load leads</p>
                      <p className="mt-1 text-sm">{error}</p>
                      <Button className="mt-4" variant="outline" onClick={() => void fetchLeads()}>
                        Try loading again
                      </Button>
                    </div>
                  </div>
                ) : filteredLeads.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="text-lg font-bold text-brand-deep">No leads in this view</p>
                    <p className="mt-2 text-sm text-slate-500">Create an enquiry from the audit form or adjust your filters.</p>
                    <Button variant="gold" className="mt-5 rounded-full" asChild>
                      <a href="#lead-form">Create test lead</a>
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="hidden overflow-x-auto xl:block">
                      <table className="w-full text-left text-sm">
                        <caption className="sr-only">Seller Rocket lead records and status controls</caption>
                        <thead className="bg-brand-cream text-xs uppercase tracking-wide text-slate-500">
                          <tr>
                            <th className="px-4 py-4">Brand</th>
                            <th className="px-4 py-4">Contact</th>
                            <th className="px-4 py-4">Platform</th>
                            <th className="px-4 py-4">Revenue Range</th>
                            <th className="px-4 py-4">Service Interest</th>
                            <th className="px-4 py-4">Status</th>
                            <th className="px-4 py-4">Date</th>
                            <th className="px-4 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <AnimatePresence initial={false}>
                            {filteredLeads.map((lead) => (
                              <motion.tr
                                key={lead.id}
                                layout
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="border-t border-brand-line align-top transition hover:bg-brand-cream/60"
                              >
                                <td className="px-4 py-4">
                                  <p className="font-bold text-brand-deep">{lead.name}</p>
                                  <p className="mt-1 max-w-[210px] truncate text-xs text-slate-500">{normalize(lead.website)}</p>
                                </td>
                                <td className="px-4 py-4">
                                  <div className="font-semibold text-brand-deep">{lead.phone}</div>
                                  <div className="text-slate-500">{lead.email}</div>
                                </td>
                                <td className="px-4 py-4">
                                  <Badge variant="outline">{lead.platform}</Badge>
                                </td>
                                <td className="px-4 py-4 text-slate-600">{normalize(lead.revenue_range)}</td>
                                <td className="px-4 py-4 text-slate-600">{normalize(lead.service_interest)}</td>
                                <td className="px-4 py-4">
                                  <div className="mb-2">
                                    <Badge variant={statusVariant[lead.status] ?? "neutral"}>{lead.status}</Badge>
                                  </div>
                                  <Select value={lead.status} onValueChange={(value) => void updateStatus(lead, value as LeadStatus)}>
                                    <SelectTrigger className="h-10 w-[150px]" disabled={updatingId === lead.id}>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {leadStatuses.map((status) => (
                                        <SelectItem key={status} value={status}>{status}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </td>
                                <td className="px-4 py-4 text-slate-500">{formatDate(lead.created_at)}</td>
                                <td className="px-4 py-4 text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="subtle" size="icon" aria-label="More lead actions">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="icon"
                                      onClick={() => void deleteLead(lead)}
                                      disabled={updatingId === lead.id}
                                      aria-label={`Delete lead for ${lead.name}`}
                                    >
                                      {updatingId === lead.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                    </Button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </tbody>
                      </table>
                    </div>

                    <div className="grid gap-4 p-4 xl:hidden">
                      <AnimatePresence initial={false}>
                        {filteredLeads.map((lead) => (
                          <motion.div
                            key={lead.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="rounded-2xl border border-brand-line bg-white p-4 shadow-sm"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-bold text-brand-deep">{lead.name}</p>
                                <p className="text-sm text-slate-500">{lead.email}</p>
                                <p className="text-sm text-slate-500">{lead.phone}</p>
                              </div>
                              <Badge variant={statusVariant[lead.status] ?? "neutral"}>{lead.status}</Badge>
                            </div>
                            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                              <p><span className="font-bold text-brand-deep">Platform:</span> {lead.platform}</p>
                              <p><span className="font-bold text-brand-deep">Revenue:</span> {normalize(lead.revenue_range)}</p>
                              <p><span className="font-bold text-brand-deep">Need:</span> {normalize(lead.service_interest)}</p>
                              <p><span className="font-bold text-brand-deep">Date:</span> {formatDate(lead.created_at)}</p>
                            </div>
                            <p className="mt-3 text-sm text-slate-500">{normalize(lead.website)}</p>
                            <p className="mt-3 text-sm text-slate-600">{lead.message || "No message"}</p>
                            <div className="mt-4 flex gap-3">
                              <Select value={lead.status} onValueChange={(value) => void updateStatus(lead, value as LeadStatus)}>
                                <SelectTrigger className="h-11 flex-1" disabled={updatingId === lead.id}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {leadStatuses.map((status) => (
                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => void deleteLead(lead)}
                                disabled={updatingId === lead.id}
                                aria-label={`Delete lead for ${lead.name}`}
                              >
                                {updatingId === lead.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Home, Loader2, RefreshCw, Trash2 } from "../ui/icons";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "../../lib/utils";
import { api } from "../../lib/api";
import { leadStatuses, platforms, type Lead, type LeadStatus, type Platform } from "../../types";

type PlatformFilter = Platform | "All";

const platformFilters: PlatformFilter[] = ["All", ...platforms];

const statusVariant: Record<LeadStatus, "neutral" | "warning" | "success" | "danger"> = {
  New: "neutral",
  Contacted: "warning",
  Converted: "success",
  Rejected: "danger"
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function messageText(value: string) {
  return value.trim() || "No message";
}

export function AdminDashboard() {
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("All");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setLeads(await api.listLeads(platformFilter));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load leads.");
    } finally {
      setLoading(false);
    }
  }, [platformFilter]);

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  const totalByStatus = useMemo(() => {
    return leadStatuses.reduce<Record<LeadStatus, number>>((acc, status) => {
      acc[status] = leads.filter((lead) => lead.status === status).length;
      return acc;
    }, { New: 0, Contacted: 0, Converted: 0, Rejected: 0 });
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

  return (
    <section id="admin" className="min-h-screen bg-brand-cream py-14 lg:py-20">
      <div className="container">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge variant="outline" className="mb-4 bg-white text-brand-navy">Admin view</Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-brand-deep md:text-5xl">
              Seller Rocket leads
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              A simple table for reviewing lead submissions and filtering by platform.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="subtle" asChild>
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </a>
            </Button>
            <Button variant="subtle" onClick={() => void fetchLeads()} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Refresh
            </Button>
          </div>
        </div>

        <div className="mb-5 rounded-2xl border border-brand-line bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-brand-deep">
              <Filter className="h-4 w-4 text-brand-mutedGold" />
              Platform filter
            </div>
            <div className="flex flex-wrap gap-2">
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

        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {leadStatuses.map((status) => (
            <div key={status} className="rounded-2xl border border-brand-line bg-white p-4 shadow-sm">
              <Badge variant={statusVariant[status]}>{status}</Badge>
              <p className="mt-4 text-3xl font-bold text-brand-deep">{totalByStatus[status]}</p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-brand-line bg-white shadow-brand-lift">
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
              </div>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-lg font-bold text-brand-deep">No leads found</p>
              <p className="mt-2 text-sm text-slate-500">Submit the lead form or choose a different platform filter.</p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Seller Rocket lead records</caption>
                  <thead className="bg-brand-cream text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-4">Name</th>
                      <th className="px-4 py-4">Phone</th>
                      <th className="px-4 py-4">Email</th>
                      <th className="px-4 py-4">Platform</th>
                      <th className="px-4 py-4">Message</th>
                      <th className="px-4 py-4">Status</th>
                      <th className="px-4 py-4">Created</th>
                      <th className="px-4 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {leads.map((lead) => (
                        <motion.tr
                          key={lead.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="border-t border-brand-line align-top transition hover:bg-brand-cream/60"
                        >
                          <td className="px-4 py-4 font-bold text-brand-deep">{lead.name}</td>
                          <td className="px-4 py-4 text-slate-600">{lead.phone}</td>
                          <td className="px-4 py-4 text-slate-600">{lead.email}</td>
                          <td className="px-4 py-4"><Badge variant="outline">{lead.platform}</Badge></td>
                          <td className="max-w-sm px-4 py-4 text-slate-600">{messageText(lead.message)}</td>
                          <td className="px-4 py-4">
                            <Select value={lead.status} onValueChange={(value) => void updateStatus(lead, value as LeadStatus)}>
                              <SelectTrigger className="h-10 w-[142px]" disabled={updatingId === lead.id}>
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
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => void deleteLead(lead)}
                              disabled={updatingId === lead.id}
                              aria-label={`Delete lead for ${lead.name}`}
                            >
                              {updatingId === lead.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 p-4 lg:hidden">
                <AnimatePresence initial={false}>
                  {leads.map((lead) => (
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
                        <Badge variant={statusVariant[lead.status]}>{lead.status}</Badge>
                      </div>
                      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                        <p><span className="font-bold text-brand-deep">Platform:</span> {lead.platform}</p>
                        <p><span className="font-bold text-brand-deep">Created:</span> {formatDate(lead.created_at)}</p>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">{messageText(lead.message)}</p>
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
    </section>
  );
}

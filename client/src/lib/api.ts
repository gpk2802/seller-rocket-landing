import type { Lead, LeadPayload, LeadStatus, Platform } from "../types";

function getApiBaseUrl() {
  const configured = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

  if (!configured || typeof window === "undefined") {
    return configured;
  }

  const isProductionHost = !["localhost", "127.0.0.1"].includes(window.location.hostname);
  const isLocalApi = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configured);

  return isProductionHost && isLocalApi ? "" : configured;
}

const API_BASE_URL = getApiBaseUrl();

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
}

class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    },
    ...init
  });

  const envelope = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;

  if (!response.ok || !envelope.success) {
    throw new ApiError(envelope.error ?? "Request failed", response.status, envelope.details);
  }

  return envelope.data as T;
}

export const api = {
  createLead(payload: LeadPayload) {
    return request<Lead>("/api/leads", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },
  listLeads(platform?: Platform | "All") {
    const query = platform && platform !== "All" ? `?platform=${encodeURIComponent(platform)}` : "";
    return request<Lead[]>(`/api/leads${query}`);
  },
  updateLeadStatus(id: string, status: LeadStatus) {
    return request<Lead>(`/api/leads/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
  },
  deleteLead(id: string) {
    return request<{ id: string }>(`/api/leads/${id}`, {
      method: "DELETE"
    });
  }
};

export { ApiError };

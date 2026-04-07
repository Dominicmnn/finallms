import type { ListResponse, PaginatedApiResponse } from "@/types/api";

export function normalizeListResponse<T>(payload: T[] | PaginatedApiResponse<T>): ListResponse<T> {
  if (Array.isArray(payload)) {
    return { items: payload, count: payload.length };
  }

  if ("results" in payload && Array.isArray(payload.results)) {
    return { items: payload.results, count: payload.count ?? payload.results.length };
  }

  return { items: [], count: 0 };
}

export function extractApiError(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "Something went wrong. Please try again.";
  }

  const axiosLike = error as {
    response?: { data?: { detail?: string; message?: string } };
    message?: string;
  };

  return (
    axiosLike.response?.data?.detail ||
    axiosLike.response?.data?.message ||
    axiosLike.message ||
    "Something went wrong. Please try again."
  );
}

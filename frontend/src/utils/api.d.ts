import type { ListResponse, PaginatedApiResponse } from "@/types/api";
export declare function normalizeListResponse<T>(payload: T[] | PaginatedApiResponse<T>): ListResponse<T>;
export declare function extractApiError(error: unknown): string;

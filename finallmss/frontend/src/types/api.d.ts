export interface PaginatedApiResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}
export interface ListResponse<T> {
    items: T[];
    count: number;
}
export interface ApiErrorResponse {
    detail?: string;
    message?: string;
    [key: string]: unknown;
}

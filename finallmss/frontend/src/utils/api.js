export function normalizeListResponse(payload) {
    if (Array.isArray(payload)) {
        return { items: payload, count: payload.length };
    }
    if ("results" in payload && Array.isArray(payload.results)) {
        return { items: payload.results, count: payload.count ?? payload.results.length };
    }
    return { items: [], count: 0 };
}
export function extractApiError(error) {
    if (!error || typeof error !== "object") {
        return "Something went wrong. Please try again.";
    }
    const axiosLike = error;
    return (axiosLike.response?.data?.detail ||
        axiosLike.response?.data?.message ||
        axiosLike.message ||
        "Something went wrong. Please try again.");
}

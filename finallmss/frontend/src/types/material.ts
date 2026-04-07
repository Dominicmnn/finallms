import type { UserSummary } from "./user";

export type MaterialType = "video" | "pdf" | "link";

export interface Material {
  id: number;
  course: number;
  title: string;
  description?: string;
  type: MaterialType;
  url?: string | null;
  file_url?: string | null;
  file?: string | null;
  external_url?: string | null;
  duration_seconds?: number | null;
  order?: number;
  is_published?: boolean;
  uploaded_by?: UserSummary;
  created_at?: string;
  updated_at?: string;
}

export interface MaterialPayload {
  title: string;
  description?: string;
  type: MaterialType;
  url?: string;
  file_url?: string;
  file?: File | null;
  external_url?: string;
  course: number;
  order?: number;
  is_published?: boolean;
}

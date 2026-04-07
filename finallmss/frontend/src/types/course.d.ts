import type { UserSummary } from "./user";
export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus = "draft" | "published" | "archived";
export interface Course {
    id: number;
    title: string;
    description: string;
    category?: string;
    level?: CourseLevel;
    status?: CourseStatus;
    thumbnail_url?: string | null;
    tutor?: UserSummary;
    enrollment_count?: number;
    enrolled_students?: UserSummary[];
    start_date?: string | null;
    end_date?: string | null;
    created_at?: string;
    updated_at?: string;
}
export interface CourseFilters {
    search?: string;
    category?: string;
    level?: CourseLevel | "";
    status?: CourseStatus | "";
}
export interface CoursePayload {
    title: string;
    description: string;
    category?: string;
    level?: CourseLevel;
    status?: CourseStatus;
    thumbnail_url?: string | null;
    start_date?: string | null;
    end_date?: string | null;
}

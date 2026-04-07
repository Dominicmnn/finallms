import type { ListResponse } from "@/types/api";
import type { Course, CourseFilters, CoursePayload } from "@/types/course";
export declare const courseService: {
    listCourses(filters?: CourseFilters): Promise<ListResponse<Course>>;
    getCourse(courseId: number | string): Promise<Course>;
    createCourse(payload: CoursePayload): Promise<Course>;
    updateCourse(courseId: number | string, payload: Partial<CoursePayload>): Promise<Course>;
    deleteCourse(courseId: number | string): Promise<void>;
};

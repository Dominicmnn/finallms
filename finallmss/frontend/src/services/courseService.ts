import api from "@/services/api";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { ListResponse } from "@/types/api";
import type { Course, CourseFilters, CoursePayload } from "@/types/course";
import { normalizeListResponse } from "@/utils/api";

export const courseService = {
  async listCourses(filters: CourseFilters = {}): Promise<ListResponse<Course>> {
    const params = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== undefined && value !== "")
    );
    const { data } = await api.get(API_ENDPOINTS.courses.list, { params });
    return normalizeListResponse<Course>(data as Course[]);
  },

  async getCourse(courseId: number | string): Promise<Course> {
    const { data } = await api.get<Course>(API_ENDPOINTS.courses.detail(courseId));
    return data;
  },

  async createCourse(payload: CoursePayload): Promise<Course> {
    const { data } = await api.post<Course>(API_ENDPOINTS.courses.list, payload);
    return data;
  },

  async updateCourse(courseId: number | string, payload: Partial<CoursePayload>): Promise<Course> {
    const { data } = await api.patch<Course>(API_ENDPOINTS.courses.detail(courseId), payload);
    return data;
  },

  async deleteCourse(courseId: number | string): Promise<void> {
    await api.delete(API_ENDPOINTS.courses.detail(courseId));
  }
};

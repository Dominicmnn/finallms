export const API_ENDPOINTS = {
  auth: {
    login: "/api/auth/login/",
    signup: "/api/auth/signup/",
    refresh: "/api/auth/token/refresh/",
    forgotPassword: "/api/auth/forgot-password/",
    me: "/api/users/me/"
  },
  users: {
    list: "/api/users/",
    detail: (userId: number | string) => `/api/users/${userId}/`
  },
  courses: {
    list: "/api/courses/",
    detail: (courseId: number | string) => `/api/courses/${courseId}/`,
    materials: (courseId: number | string) => `/api/courses/${courseId}/materials/`
  },
  materials: {
    list: "/api/materials/",
    detail: (materialId: number | string) => `/api/materials/${materialId}/`
  }
} as const;

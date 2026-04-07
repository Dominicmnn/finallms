export declare const API_ENDPOINTS: {
    readonly auth: {
        readonly login: "/api/auth/login/";
        readonly signup: "/api/auth/signup/";
        readonly refresh: "/api/auth/token/refresh/";
        readonly forgotPassword: "/api/auth/forgot-password/";
        readonly me: "/api/users/me/";
    };
    readonly users: {
        readonly list: "/api/users/";
        readonly detail: (userId: number | string) => string;
    };
    readonly courses: {
        readonly list: "/api/courses/";
        readonly detail: (courseId: number | string) => string;
        readonly materials: (courseId: number | string) => string;
    };
    readonly materials: {
        readonly list: "/api/materials/";
        readonly detail: (materialId: number | string) => string;
    };
};

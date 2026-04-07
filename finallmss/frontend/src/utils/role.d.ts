import type { UserRole } from "@/types/user";
export interface NavItem {
    label: string;
    to: string;
}
export declare function getDefaultRouteByRole(role?: UserRole): string;
export declare function getNavItemsByRole(role?: UserRole): NavItem[];
export declare function roleLabel(role?: UserRole): string;

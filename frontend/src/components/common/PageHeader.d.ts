import type { ReactNode } from "react";
interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
}
declare function PageHeader({ title, subtitle, actions }: PageHeaderProps): import("react/jsx-runtime").JSX.Element;
export default PageHeader;

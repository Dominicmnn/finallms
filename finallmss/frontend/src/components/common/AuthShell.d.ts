import type { ReactNode } from "react";
interface AuthShellProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}
declare function AuthShell({ title, subtitle, children }: AuthShellProps): import("react/jsx-runtime").JSX.Element;
export default AuthShell;

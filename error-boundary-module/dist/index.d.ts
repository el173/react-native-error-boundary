import { ReactNode } from 'react';
interface ErrorBoundaryProps {
    children: ReactNode;
    renderError?: (error: Error | null, errorInfo: string | undefined) => ReactNode;
    message?: string;
    enableOriginalHandler?: boolean;
}
declare const ErrorBoundary: ({ children, renderError, message, enableOriginalHandler }: ErrorBoundaryProps) => any;
export default ErrorBoundary;

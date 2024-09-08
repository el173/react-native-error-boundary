import { ReactNode } from 'react';
type ErrorHandlerCallback = (error: Error, isFatal?: boolean) => void;
interface ErrorBoundaryProps {
    children: ReactNode;
    renderError?: (error: Error | null, errorInfo: string | undefined) => ReactNode;
    message?: string;
    enableOriginalHandler?: boolean;
    onError?: ErrorHandlerCallback;
    showStackTrace?: boolean;
}
declare const ErrorBoundary: ({ children, renderError, message, enableOriginalHandler, onError, showStackTrace, }: ErrorBoundaryProps) => any;
export default ErrorBoundary;

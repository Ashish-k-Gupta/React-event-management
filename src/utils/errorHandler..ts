// utils/errorHandler.ts
export function handleError(error: unknown, defaultMessage: string): string {
    if (error instanceof Error) {
        return `${defaultMessage}: ${error.message}`;
    }
    return defaultMessage;
}

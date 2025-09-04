import { useState } from "react";
import { handleError } from "../utils/errorHandler.";

export function useError() {
    const [error, setError] = useState<string | null>(null);

    function catchError(err: unknown, message: string) {
        setError(handleError(err, message))
    }
    return { error, setError, catchError }
}
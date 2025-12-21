const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });


    if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse?.details?.[0]?.message || errorResponse.message || 'An error occurred'
        throw new Error(errorMessage)
    }

    return response.json();
}
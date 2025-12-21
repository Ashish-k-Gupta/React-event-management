import { apiFetch } from "./api";

export function login(email: string, password: string) {
    return apiFetch("/auth/login", {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
}


export function register(data: { firstName: string, lastName: string, email: string, password: string, role: string }) {
    return apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export function logout() {
    localStorage.removeItem("token")
    window.location.href = '/login';
}
import { apiFetch } from "./api";

export function login(email: string, password: string) {
    return apiFetch("/auth/login", {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
}


export function register(firstName: string, lastName: string, email: string, password: string, role: string) {
    return apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password, role })
    })
}

export function logout() {
    localStorage.removeItem("token")
    window.location.href = '/login';
}
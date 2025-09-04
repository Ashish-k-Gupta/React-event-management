import { createContext, useState, useContext, useEffect, type ReactNode } from "react";

interface UserType {
    id: number;          // add this
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: UserType | null;
    login: (userData: UserType, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
            try {
                const parsedUser: UserType = JSON.parse(storedUser);
                setIsAuthenticated(true);
                setUser(parsedUser);
            } catch (e) {
                console.error("Failed to parse user data from localStorage", e);
                logout(); // Clear invalid data
            }
        }
    }, []);

    const login = (userData: UserType, token: string) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

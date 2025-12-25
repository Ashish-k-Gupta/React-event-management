import { useAuth } from "../../../context/authContext";
import { Eye, EyeOff } from "lucide-react";
import { useError } from "../../../hooks/useError";
import { login as loginService } from "../../../service/authService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { error, catchError } = useError();
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const data = await loginService(userEmail, password);
            if (data?.user && data?.token) {
                login(data.user, data.token);
                navigate("/")
            }
        } catch (error) {
            catchError(error, "Login Failed")
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300">
                        Login Button
                    </button>
                </form>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <p className="text-gray-600 text-center">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-blue-600 font-medium hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );

}
console.log("API_URL", import.meta.env.VITE_API_URL)
export default Login;

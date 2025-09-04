import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { register } from "../service/authService";
import { useAuth } from "../context/authContext";
import { useError } from "../hooks/useError";
function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { error, catchError } = useError();


    const { login } = useAuth();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const data = await register(firstName, lastName, email, password, role);
            if (data.token) {
                localStorage.setItem("token", data.token)
                login(data.user);
            }
        } catch (err) {
            catchError(err, "Sigup failed")
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-[28rem] space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-900">Create your account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="">-- Select Role --</option>
                        <option value="organizer">Organizer</option>
                        <option value="attendee">Attendee</option>
                    </select>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300">
                        Signup
                    </button>
                </form>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <p className="text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );

}

export default Signup;
/*
{
    "firstName": "Jaikishan",
    "lastName": "Kumar",
    "email": "jaiky4u@example.com",
    "password": "Test@1234",
    "role": "attendee",
    "isActive": "",
    "isAdmin": "false"
}
*/
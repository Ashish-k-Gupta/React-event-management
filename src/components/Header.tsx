import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { logout } from "../service/authService";
import { useAuth } from "../context/authContext";
import Profile from "./Profile";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    return (
        <header className="w-full bg-gray-800 text-white shadow-md">
            {/* AppBar */}
            <nav className="flex justify-between items-center px-6 py-3">
                {/* Logo */}
                <h1 className="text-2xl font-semibold tracking-wide">MyApp</h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        to="/"
                        className="text-sm font-medium hover:text-orange-400 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        to="/events"
                        className="text-sm font-medium hover:text-orange-400 transition-colors"
                    >
                        Events
                    </Link>

                    {isAuthenticated ? (
                        <Profile />
                    ) : (
                        <Link
                            to="/signup"
                            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Sign Up
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="md:hidden bg-gray-700 shadow-md rounded-b-lg">
                    <ul className="flex flex-col py-4 px-6 gap-4">
                        <li>
                            <Link
                                to="/"
                                className="block text-sm font-medium hover:text-orange-400 transition-colors"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/events"
                                className="block text-sm font-medium hover:text-orange-400 transition-colors"
                            >
                                Events
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li
                                    onClick={logout}
                                    className="cursor-pointer text-sm font-medium hover:text-orange-400 transition-colors"
                                >
                                    Logout
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        className="block bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/signup"
                                        className="block border border-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;

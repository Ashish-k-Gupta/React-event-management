import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router"; // import Link from TanStack Router
import { logout } from "../service/authService";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full bg-gray-900 text-white p-4">
            <nav className="flex justify-between items-center">
                {/* Logo / Title */}
                <h1 className="text-xl font-bold">MyApp</h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6 list-none items-center">
                    <li>
                        <Link to="/" className="hover:text-orange-400 transition duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/events" className="hover:text-orange-400 transition duration-300">
                            Events
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/categories" className="hover:text-orange-400 transition duration-300">
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-orange-400 transition duration-300">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/myevents" className="hover:text-orange-400 transition duration-300">
                            My Events
                        </Link>
                    </li> */}
                    <li
                        onClick={logout}
                        className="cursor-pointer hover:text-orange-400 transition duration-300"
                    >
                        Logout
                    </li>
                    <li>
                        <Link
                            to="/signup"
                            className="ml-4 bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                        >
                            Sign Up
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="block md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <ul className="flex flex-col gap-4 mt-4 md:hidden">
                    <li>
                        <Link to="/" className="hover:text-orange-400 transition duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/events" className="hover:text-orange-400 transition duration-300">
                            Events
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/categories" className="hover:text-orange-400 transition duration-300">
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-orange-400 transition duration-300">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/myevents" className="hover:text-orange-400 transition duration-300">
                            My Events
                        </Link>
                    </li> */}
                    <li
                        onClick={logout}
                        className="cursor-pointer hover:text-orange-400 transition duration-300"
                    >
                        Logout
                    </li>
                    <li>
                        <Link
                            to="/signup"
                            className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300 text-center"
                        >
                            Sign Up
                        </Link>
                    </li>
                </ul>
            )}
        </header>
    );
}

export default Header;

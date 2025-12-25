import { UserCircle, Lock, LogOut } from "lucide-react";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Profile() {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside as any);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside as any);
        };
    }, []);

    if (!isAuthenticated || !user) {
        return null;
    }

    const userInitial = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white p-0.5 mt-1 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <UserCircle size={25} className="text-gray-600" />
            </button>

            {isOpen && (
                <div ref={profileRef} className="absolute right-0 mt-2 w-80 p-4 bg-white rounded-2xl shadow-xl space-y-0 z-50">
                    <div className="flex items-center space-x-4 w-full border-b border-gray-500 pb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                            {userInitial}
                        </div>
                        <div>
                            <h3 className="font-semibold text-black">{user.firstName} {user.lastName} - {user.role}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <ul className="w-full text-gray-700">
                        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <UserCircle size={20} />
                            <span>Profile - {user.role}</span>
                        </li>
                        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <Lock size={20} />
                            <span>Change Password</span>
                        </li>
                        <li
                            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 cursor-pointer text-red-500"
                            onClick={handleLogout}
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Profile;

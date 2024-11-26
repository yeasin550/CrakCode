/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import logo from "../../assets/Logo.png"
import { AuthContext } from '../../providers/AuthProviders';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    // console.log(user)
    const handleLogOut = () => {
        logOut()
            .then(result => { })
            .catch(error => console.log(error))
    }


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="sticky top-0 bg-white z-50 py-4 shadow-sm shadow-gray-300">
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-xl">
                    <NavLink to="/" >
                        <img src={logo} className="w-20" alt="" />
                    </NavLink>
                </div>

                {/* Menu Items */}
                <div className="hidden md:flex space-x-8 text-lg">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-gray-800 hover:text-purple-700 ${isActive ? 'font-bold text-purple-700' : ''}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/all-task"
                        className={({ isActive }) =>
                            `text-gray-800 hover:text-purple-700 ${isActive ? 'font-bold text-purple-700' : ''}`
                        }
                    >
                        AllTasks
                    </NavLink>
                </div>

                {/* Enquire Now Button */}
                <div className="hidden md:block">
                    {user ? (
                        <NavLink
                            onClick={handleLogOut}
                            className="border border-gray-500 bg-indigo-600 text-white px-4 py-2 rounded-md  transition duration-300 "
                        >
                            LogOut
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/login"
                            className="border border-gray-500 bg-indigo-600 text-white px-4 py-2 rounded-md  transition duration-300 "
                        >
                            Login
                        </NavLink>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                        <FiMenu size={24} />
                    </button>
                </div>
            </div>

            {/* Responsive Menu Items */}
            {menuOpen && (
                <div className="md:hidden flex flex-col text-center space-y-4 py-4 px-4 bg-white shadow-lg">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-gray-800 hover:text-purple-700 ${isActive ? 'font-bold text-purple-700' : ''}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/all-task"
                        className={({ isActive }) =>
                            `text-gray-800 hover:text-purple-700 ${isActive ? 'font-bold text-purple-700' : ''}`
                        }
                    >
                        AllTasks
                    </NavLink>

                    {/* Enquire Now Button */}
                    <div className="hidden md:block">
                        {user ? (
                            <NavLink
                                onClick={handleLogOut}
                                className="border border-gray-500 bg-indigo-600 px-4 py-2 rounded-md  transition duration-300 "
                            >
                                LogOut
                            </NavLink>
                        ) : (
                            <NavLink
                                to="/login"
                                className="border border-gray-500 bg-indigo-600 px-4 py-2 rounded-md  transition duration-300 "
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
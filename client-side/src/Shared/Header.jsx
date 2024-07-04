"use client";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import logo from '../assets/pawfect logo.png';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(toast.success("LogOut was successful"))
            .then(error => console.log(error.message))
    }

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div>
            <Navbar fluid rounded>
                <Link to='/'>
                    <Navbar.Brand>
                        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Pawfect</span>
                    </Navbar.Brand>
                </Link>
                {
                    user ?

                        (<div className="flex md:order-2">
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar img={user?.photoURL} rounded />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">{user?.displayName}</span>
                                    <span className="block truncate text-sm font-medium">{user?.email}</span>
                                </Dropdown.Header>
                                <Link to='/dashboard'><Dropdown.Item>Dashboard</Dropdown.Item></Link>
                                <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
                            </Dropdown>
                            <Navbar.Toggle />
                        </div>)
                        :
                        (
                            <div className="flex md:order-2">
                                <Link to='/login'><Button className="bg-[#FA524F] rounded-full">Login</Button></Link>
                                <Navbar.Toggle />
                            </div>
                        )
                }

                <Navbar.Collapse>
                    <Navbar.Link><Link to='/'>Home</Link></Navbar.Link>
                    <Navbar.Link><Link to='/pet-list'>Pet Listing</Link></Navbar.Link>
                    <Navbar.Link><Link to='/dashboard/donation-campaign'>Donation</Link></Navbar.Link>
                    <Navbar.Link><Link to='/dashboard/my-donation'>Campaign</Link></Navbar.Link>
                </Navbar.Collapse>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 transition-colors duration-300 -mr-72"
                >
                    {theme === 'light' ? (
                        <FaMoon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                    ) : (
                        <FaSun className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                    )}
                </button>
            </Navbar>
        </div>
    );
};

export default Header;
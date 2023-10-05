import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FiMenu } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { BiShoppingBag } from 'react-icons/bi';
import { AiTwotoneStar } from "react-icons/ai";
import { FaCoffee } from "react-icons/fa";
import { LiaBlogSolid } from "react-icons/lia";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { AiTwotoneSetting } from "react-icons/ai";

const Bar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMediaOpen, setIsMediaOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const toggleMedia = () => {
        setIsMediaOpen(!isMediaOpen);
    };

    const iconSize = 'w-6 h-6 sm:w-6 sm:h-6 md:w-6 md:h-6';

    return (
        <>
            {/* Navbar */}
            <nav className={`fixed top-0 z-50 w-full bg-[#ffcb53] shadow-md`}>
                <div className="px-3 py-1 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
                                aria-controls="logo-sidebar"
                                aria-label="Open sidebar"
                            >
                                {isMenuOpen ? (
                                    <span className="sr-only">Close sidebar</span>
                                ) : (
                                    <span className="sr-only">Open sidebar</span>
                                )}
                                <FiMenu className="w-6 h-6" />
                            </button>
                            <Link to={'/'} className="flex ml-2 md:mr-24">
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                                    Dr Chip
                                </span>
                            </Link>
                        </div>

                        {/* User Dropdown */}
                        <div>
                            <button
                                type="button"
                                onClick={toggleProfile}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    alt="user photo"
                                />
                            </button>

                            {/* User Dropdown Content */}
                            <div className={`z-50 ${isProfileOpen ? 'translate-x-0 mr-2' : 'translate-x-full'} my-4 bg-white rounded-md shadow-md border-t-2 absolute right-0 transition-transform`}>
                                <div className="px-4 text-right my-3">
                                    <p className="text-gray-800 font-semibold">
                                        Angga Saputra
                                    </p>
                                    <p className="text-gray-600">
                                        angsa0077@gmail.com
                                    </p>
                                    <button className='bg-[#ffcb53] px-3 py-1 mt-3 rounded-lg text-white hover:scale-105 hover:font-bold'>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform ${isMenuOpen ? '-translate-x-0' : '-translate-x-full'
                    } bg-[#ffcb53] sm:translate-x-0 text-white shadow-md`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        {/* Sidebar items */}
                        {[
                            { to: '/dashboard', icon: <RxDashboard className={iconSize} />, label: 'Dashboard' },
                            { to: '/dashboard/products', icon: <BiShoppingBag className={iconSize} />, label: 'Products' },
                            { to: '/dashboard/jasa', icon: <FaCoffee className={iconSize} />, label: 'Jasa' },
                            { to: '/', icon: <AiTwotoneStar className={iconSize} />, label: 'Program' },
                            {
                                icon: <LiaBlogSolid className={iconSize} />, label: 'Media', submenu: [
                                    { to: '/blog', label: 'Blog' },
                                    { to: '/about-me', label: 'About Me' }
                                ]
                            },
                            { to: '/', icon: <LiaFileInvoiceSolid className={iconSize} />, label: 'Laporan' },
                            { to: '/', icon: <AiTwotoneSetting className={iconSize} />, label: 'Setting' },
                        ].map((item, index) => (
                            <li key={index} className={`transform transition-all hover:scale-105 hover:font-bold hover:bg-white hover:text-[#ffcb53] hover:rounded-md ${location.pathname === item.to ? 'bg-white text-[#ffcb53] rounded-md' : ''
                                }`}>
                                {item.submenu ? (
                                    <>
                                        <button
                                            onClick={toggleMedia}
                                            className="flex items-center ml-3 gap-3 py-2 w-full text-left focus:outline-none"
                                        >
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </button>
                                        {isMediaOpen && (
                                            <ul className="ml-6">
                                                {item.submenu.map((subItem, subIndex) => (
                                                    <li
                                                        key={subIndex}
                                                        className={`transform transition-all hover:scale-105 hover:bg-slate-50 ml-3 hover:text-[#ffcb53] hover:rounded-md ${location.pathname === subItem.to ? 'bg-white text-[#ffcb53] rounded-md' : ''
                                                            }`}
                                                    >
                                                        <Link to={subItem.to} className="flex items-center ml-3 gap-3 py-2">
                                                            <span>{subItem.label}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link to={item.to} className="flex items-center ml-3 gap-3 py-2">
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Bar;

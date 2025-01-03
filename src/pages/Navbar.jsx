import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';

const Navbar = () => {

    const { user, signOutUser } = useAuth()
    console.log(user);



    const navLinks = (
        <>
            <li>
                <NavLink
                    to='/'
                    className="text-yellow-500 hover:text-yellow-300 transition-colors px-4 py-2 rounded-md"
                    activeClassName="bg-yellow-500 text-black"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/products'
                    className="text-yellow-500 hover:text-yellow-300 transition-colors px-4 py-2 rounded-md"
                    activeClassName="bg-yellow-500 text-black"
                >
                    Products
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/about'
                    className="text-yellow-500 hover:text-yellow-300 transition-colors px-4 py-2 rounded-md"
                    activeClassName="bg-yellow-500 text-black"
                >
                    About
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/contact'
                    className="text-yellow-500 hover:text-yellow-300 transition-colors px-4 py-2 rounded-md"
                    activeClassName="bg-yellow-500 text-black"
                >
                    Contact
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-gray-900 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <h2 className="font-bold text-2xl text-yellow-500">NextGen Mobiles</h2>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            {user ? (
                <div className='navbar-end'>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className=" border rounded-2xl m-1">
                            <img title={user?.displayName
                            }
                                className='w-10 h-10 rounded-full' src={user?.photoURL || '/user.png'} alt="photo" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-gray-900 rounded-box z-[1] w-52 p-2 shadow">
                            <li><Link to="/dashboard/overview" className="text-yellow-500 hover:text-yellow-300 transition-colors">Dashboard</Link></li>
                            <li><button
                                onClick={() => signOutUser()}
                                className="text-yellow-500 hover:text-yellow-300 transition-colors">LogOut</button></li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="navbar-end">
                    <Link to="/signin" className="btn border bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors">SignIn</Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;

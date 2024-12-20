import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { NavLink } from 'react-router';
import useUserData from '../../hooks/useUserData';
import buyerRoutes from './Buyer/buyerRoutes';
import sellerRoutes from './Seller/sellerRoutes';

;

const Sidebar = ({ handleNavLinkClick }) => {
    const { userData, loading } = useUserData();

    if (loading) {
        return <p>Loading...</p>;
    }
    console.log(userData, 'sidebar')


    const isBuyer = userData?.role === 'buyer';
    const isSeller = userData?.role === 'seller';
    const isAdmin = userData?.role === 'admin';


    return (
        <>
            {isSeller && sellerRoutes.map((route) => (
                <NavLink
                    key={route.id}
                    to={route.path}
                    className={({ isActive }) =>
                        `flex items-center space-x-4 py-2 px-4 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${isActive ? 'bg-blue-800 text-white' : ''}`
                    }
                    onClick={handleNavLinkClick}
                >
                    <route.icon className="text-2xl" />
                    <span>{route.title}</span>
                </NavLink>
            ))}
            {isBuyer && buyerRoutes.map((route) => (
                <NavLink
                    key={route.id}
                    to={route.path}
                    className={({ isActive }) =>
                        `flex items-center space-x-4 py-2 px-4 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${isActive ? 'bg-blue-800 text-white' : ''}`
                    }
                    onClick={handleNavLinkClick}
                >
                    <route.icon className="text-2xl" />
                    <span>{route.title}</span>
                </NavLink>
            ))}

            <NavLink
                to='/'
                className={({ isActive }) =>
                    `flex items-center space-x-4 py-2 px-4 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${isActive ? 'bg-blue-800 text-white' : ''}`
                }
                onClick={handleNavLinkClick}
            >
                <AiOutlineHome className="text-xl" />
                <span>Home</span>
            </NavLink>
            <NavLink
                to='/dashboard/overview'
                className={({ isActive }) =>
                    `flex items-center space-x-4 py-2 px-4 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md ${isActive ? 'bg-orange-800 text-white' : ''}`
                }
                onClick={handleNavLinkClick}
            >
                <HiOutlineDocumentReport className="text-xl" />
                <span>Overview</span>
            </NavLink>
        </>
    );
};

export default Sidebar;

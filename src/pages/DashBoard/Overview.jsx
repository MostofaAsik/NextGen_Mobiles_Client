import React from 'react';
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineDollarCircle } from 'react-icons/ai';
import { FaChartLine } from 'react-icons/fa';
import useUserData from '../../hooks/useUserData';


const Overview = () => {

    const { userData } = useUserData()
    console.log(userData);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* User Info Section */}
            <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img
                        src={userData?.image}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                        title={userData?.name}
                    />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-800"></h2>
                    <p className="text-gray-600">UserName: {userData?.name}</p>
                    <p className="text-gray-600">Email: {userData?.email}</p>
                    <p className="text-sm text-blue-600 mt-2">Role : {userData?.role}</p>
                </div>
            </div>



        </div>
    );
};

export default Overview;

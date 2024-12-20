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
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-800"></h2>
                    <p className="text-gray-600">{userData.email}</p>
                    <p className="text-sm text-blue-600 mt-2">{userData?.role}</p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center">
                    <AiOutlineUser className="text-4xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Users</h3>
                        <p className="text-2xl font-bold">1,245</p>
                    </div>
                </div>

                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center">
                    <AiOutlineShoppingCart className="text-4xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Orders</h3>
                        <p className="text-2xl font-bold">350</p>
                    </div>
                </div>

                <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center">
                    <AiOutlineDollarCircle className="text-4xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Earnings</h3>
                        <p className="text-2xl font-bold">$4,500</p>
                    </div>
                </div>

                <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md flex items-center">
                    <FaChartLine className="text-4xl mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">Growth Rate</h3>
                        <p className="text-2xl font-bold">+15%</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>

                <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                                <AiOutlineShoppingCart className="text-2xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-gray-800 font-medium">New order placed</p>
                                <p className="text-gray-500 text-sm">2 hours ago</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">+ $150</span>
                    </li>

                    <li className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full">
                                <AiOutlineUser className="text-2xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-gray-800 font-medium">New user registered</p>
                                <p className="text-gray-500 text-sm">5 hours ago</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">+ 1 user</span>
                    </li>

                    <li className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center rounded-full">
                                <AiOutlineDollarCircle className="text-2xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-gray-800 font-medium">Payment received</p>
                                <p className="text-gray-500 text-sm">1 day ago</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">+ $500</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Overview;

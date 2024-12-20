import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineDelete } from 'react-icons/ai';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    // Load users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-users`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access-token')}`
                    }
                });
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Failed to load users');
            }
        };
        fetchUsers();
    }, []);

    // Change user role
    const handleChangeRole = async (userId, newRole) => {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/update-user-role/${userId}`, { role: newRole }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            if (res.data.modifiedCount > 0) {
                toast.success('User role updated successfully!');
                setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
            }
        } catch (error) {
            console.error('Error updating user role:', error);
            toast.error('Failed to update user role');
        }
    };

    // Delete a user
    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/delete-user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            toast.success('User deleted successfully!');
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete the user');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">All Users</h2>

                {users.length === 0 ? (
                    <p className="text-center text-gray-500">No users found.</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-4 border border-gray-300">#</th>
                                <th className="p-4 border border-gray-300">User</th>
                                <th className="p-4 border border-gray-300">Email</th>
                                <th className="p-4 border border-gray-300">Role</th>
                                <th className="p-4 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="border-t hover:bg-gray-50">
                                    <td className="p-4 border border-gray-300">{index + 1}</td>
                                    <td className="p-4 border border-gray-300 flex items-center space-x-4">
                                        <img
                                            src={user.photoURL || 'https://via.placeholder.com/50'}
                                            alt="User"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="font-bold">{user.name}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-300">{user.email}</td>
                                    <td className="p-4 border border-gray-300">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleChangeRole(user._id, e.target.value)}
                                            className="border border-gray-300 rounded-lg p-2"
                                        >
                                            <option value="buyer">Buyer</option>
                                            <option value="seller">Seller</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="p-4 border border-gray-300">
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <AiOutlineDelete size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <ToastContainer />
            </div>
        </div>
    );
};

export default AllUsers;

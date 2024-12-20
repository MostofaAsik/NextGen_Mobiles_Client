import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import useUserData from '../../../hooks/useUserData';
import Loader from '../../../components/Loader';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const { loading } = useUserData();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`, {
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
        const loadingToastId = toast.loading('Updating role...');

        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/update-user-role/${userId}`,
                { role: newRole },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access-token')}`
                    }
                }
            );

            if (res.data.success) {
                toast.update(loadingToastId, {
                    render: 'User role updated successfully!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });
                setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
            } else {
                toast.update(loadingToastId, {
                    render: 'Failed to update user role',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    // Delete a user
    const handleDeleteUser = async (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/users/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access-token')}`
                        }
                    });

                    if (res.data.success) {
                        setUsers(users.filter(user => user._id !== userId));
                        Swal.fire("Deleted!", "User has been deleted.", "success");
                    } else {
                        Swal.fire("Failed!", "User not found or already deleted.", "error");
                    }
                } catch (error) {
                    console.error('Error deleting user:', error);
                    Swal.fire("Error!", "Failed to delete user.", "error");
                }
            }
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2 sm:p-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-4 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">All Users</h2>

                {loading && <Loader />}

                {users.length === 0 ? (
                    <p className="text-center text-gray-500">No users found.</p>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="p-2 sm:p-4 border border-gray-300 hidden sm:table-cell">#</th>
                                    <th className="p-2 sm:p-4 border border-gray-300 hidden sm:table-cell">User</th>
                                    <th className="p-2 sm:p-4 border border-gray-300">Email</th>
                                    <th className="p-2 sm:p-4 border border-gray-300">Role</th>
                                    <th className="p-2 sm:p-4 border border-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id} className="border-t hover:bg-gray-50">
                                        <td className="p-2 sm:p-4 border border-gray-300 hidden sm:table-cell">{index + 1}</td>
                                        <td className="p-2 sm:p-4 border border-gray-300 hidden sm:table-cell flex items-center space-x-4">
                                            <img
                                                src={user.image || 'https://via.placeholder.com/50'}
                                                alt="User"
                                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                                            />
                                            <div>
                                                <p className="font-bold text-sm sm:text-base">{user.name}</p>
                                            </div>
                                        </td>
                                        <td className="p-2 sm:p-4 border border-gray-300 text-sm sm:text-base">{user.email}</td>
                                        <td className="p-2 sm:p-4 border border-gray-300">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleChangeRole(user._id, e.target.value)}
                                                className="border border-gray-300 rounded-lg p-1 sm:p-2 text-sm sm:text-base"
                                            >
                                                <option value="buyer">Buyer</option>
                                                <option value="seller">Seller</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="p-2 sm:p-4 border border-gray-300">
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
                    </div>
                )}
                <ToastContainer />
            </div>
        </div>
    );
};

export default AllUsers;

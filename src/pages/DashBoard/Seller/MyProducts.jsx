import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import useAuth from '../../../hooks/useAuth';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('access-token');
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/products`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProducts(res.data);
            } catch (error) {
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);



    // Delete a product
    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/delete-product/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            toast.success('Product deleted successfully!');
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete the product');
        }
    };

    // Edit a product (optional: you can use a modal or a separate page)
    const handleEdit = (productId) => {
        toast.info('Edit feature is under development.');
        // Optionally, open a modal or navigate to an edit page
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">My Products</h2>

                {products.length === 0 ? (
                    <p className="text-center text-gray-500">No products found. Start adding products!</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-4 border border-gray-300">#</th>
                                <th className="p-4 border border-gray-300">Title</th>
                                <th className="p-4 border border-gray-300">Brand</th>
                                <th className="p-4 border border-gray-300">Price</th>
                                <th className="p-4 border border-gray-300">Stock</th>
                                <th className="p-4 border border-gray-300">Category</th>
                                <th className="p-4 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id} className="border-t hover:bg-gray-50">
                                    <td className="p-4 border border-gray-300">{index + 1}</td>
                                    <td className="p-4 border border-gray-300">{product.title}</td>
                                    <td className="p-4 border border-gray-300">{product.brand}</td>
                                    <td className="p-4 border border-gray-300">${product.price}</td>
                                    <td className="p-4 border border-gray-300">{product.stock}</td>
                                    <td className="p-4 border border-gray-300">{product.category}</td>
                                    <td className="p-4 border border-gray-300">
                                        <button
                                            onClick={() => handleEdit(product._id)}
                                            className="text-blue-500 hover:text-blue-700 mr-4"
                                        >
                                            <AiOutlineEdit size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
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

export default MyProducts;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import SweetAlert from 'sweetalert2';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    console.log(productToEdit);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('access-token');
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/products`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
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

    // Delete product handler
    const handleDelete = async (productId) => {
        SweetAlert.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('access-token');
                    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/user/products/${productId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (res.data.success) {
                        setProducts(products.filter((product) => product._id !== productId));
                        SweetAlert.fire('Deleted!', 'Product has been deleted.', 'success');
                    } else {
                        SweetAlert.fire('Failed!', 'Product not found or already deleted.', 'error');
                    }
                } catch (error) {
                    SweetAlert.fire('Error!', 'Failed to delete product.', 'error');
                }
            }
        });
    };

    // Open modal to edit product
    const handleEdit = (productId) => {
        const product = products.find(product => product._id === productId);
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setProductToEdit(null);
    };

    // **PATCH Request Handler**
    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('access-token');
            const { _id, ...updateData } = productToEdit; // Destructure _id to avoid sending it in the update request

            const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/user/products/${_id}`, updateData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (res.data.success) {
                toast.success('Product updated successfully!');

                // Update the product in the local state without reloading
                setProducts((prevProducts) =>
                    prevProducts.map(product => product._id === _id ? { ...product, ...updateData } : product)
                );

                closeModal();
            } else {
                toast.error('Failed to update product.');
            }
        } catch (error) {
            toast.error('An error occurred while updating the product.');
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 pt-4 px-1">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 md:px-12 px-1">
                <h2 className="text-2xl font-bold text-center mb-6">My Products</h2>

                {products.length === 0 ? (
                    <p className="text-center text-gray-500">No products found. Start adding products!</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-4 border border-gray-300">Title</th>
                                <th className="p-4 border border-gray-300 hidden md:table-cell">Brand</th>
                                <th className="p-4 border border-gray-300 hidden md:table-cell">Stock</th>
                                <th className="p-4 border border-gray-300">Price</th>
                                <th className="p-4 border border-gray-300">Category</th>
                                <th className="p-4 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="border-t hover:bg-gray-50">
                                    <td className="p-4 border border-gray-300">{product.title}</td>
                                    <td className="p-4 border border-gray-300 hidden md:table-cell">{product.brand}</td>
                                    <td className="p-4 border border-gray-300 hidden md:table-cell">{product.stock}</td>
                                    <td className="p-4 border border-gray-300">${product.price}</td>
                                    <td className="p-4 border border-gray-300">{product.category}</td>
                                    <td className="p-4 border border-gray-300 flex gap-2 justify-start">
                                        <button onClick={() => handleEdit(product._id)} className="text-blue-500 hover:text-blue-700">
                                            <AiOutlineEdit size={20} />
                                        </button>

                                        <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700">
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

            {isModalOpen && productToEdit && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 ">
                    <div className="bg-white p-10 rounded shadow-lg md:w-1/2 w-96">

                        <form onSubmit={handleUpdateProduct} className=''>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Title</label>
                            <input type="text" value={productToEdit.title} onChange={(e) => setProductToEdit({ ...productToEdit, title: e.target.value })} className="w-full p-2 border mb-4" placeholder="Title" />

                            <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Brand</label>
                            <input type="text" value={productToEdit.brand} onChange={(e) => setProductToEdit({ ...productToEdit, brand: e.target.value })} className="w-full p-2 border mb-4" placeholder="Brand" />

                            <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Price</label>
                            <input type="number" value={productToEdit.price} onChange={(e) => setProductToEdit({ ...productToEdit, price: e.target.value })} className="w-full p-2 border mb-4" placeholder="Price" />

                            <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Stock</label>
                            <input type="number" value={productToEdit.stock} onChange={(e) => setProductToEdit({ ...productToEdit, stock: e.target.value })} className="w-full p-2 border mb-4" placeholder="Stock" />

                            <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Category</label>
                            <input type="text" value={productToEdit.category} onChange={(e) => setProductToEdit({ ...productToEdit, category: e.target.value })} className="w-full p-2 border mb-4" placeholder="Category" />

                            <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Image</label>
                            <input type="text" value={productToEdit.imageURL} onChange={(e) => setProductToEdit({ ...productToEdit, imageURL: e.target.value })} className="w-full p-2 border mb-4" placeholder="Image URL" />

                            <div className='flex flex-row-reverse justify-between'>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                                <button onClick={closeModal} className="text-gray-500 btn btn-outline btn-accent">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyProducts;

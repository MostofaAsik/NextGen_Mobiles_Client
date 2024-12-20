import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth();

    const onSubmit = (data) => {
        const product = {
            ...data,
            email: user?.email
        };
        console.log(product);
        console.log(localStorage.getItem('access-token'));

        axios.post(`${import.meta.env.VITE_BASE_URL}/add-product`, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                console.log('Response:', res.data);
                toast.success('Product added successfully!');
                // reset(); 
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Something went wrong while adding the product.');
            });



    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Title */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter product title"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="brand">Brand</label>
                            <input
                                id="brand"
                                type="text"
                                {...register('brand', { required: 'Brand is required' })}
                                className={`w-full border ${errors.brand ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter brand name"
                            />
                            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Price */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="price">Price</label>
                            <input
                                id="price"
                                type="number"
                                {...register('price', {
                                    required: 'Price is required',
                                    min: { value: 1, message: 'Price must be at least 1' }
                                })}
                                className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter product price"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="stock">Stock</label>
                            <input
                                id="stock"
                                type="number"
                                {...register('stock', {
                                    required: 'Stock is required',
                                    min: { value: 1, message: 'Stock must be at least 1' }
                                })}
                                className={`w-full border ${errors.stock ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter stock quantity"
                            />
                            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
                        </div>
                    </div>

                    <div>
                        {/* Image URL */}
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="imageURL">Image URL</label>
                        <input
                            id="imageURL"
                            type="text"
                            {...register('imageURL', { required: 'Image URL is required' })}
                            className={`w-full border ${errors.imageURL ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter image URL"
                        />
                        {errors.imageURL && <p className="text-red-500 text-sm mt-1">{errors.imageURL.message}</p>}
                    </div>

                    <div>
                        {/* Description */}
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            {...register('description', { required: 'Description is required' })}
                            className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter product description"
                            rows="3"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div>
                        {/* Category */}
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="category">Category</label>
                        <input
                            id="category"
                            type="text"
                            {...register('category', { required: 'Category is required' })}
                            className={`w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter product category"
                        />
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Add Product
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddProduct;

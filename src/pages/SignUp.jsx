import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);


    const imgbbApiKey = '0ed5a721afde96020006e29d6da8f29f';

    const submitHandler = async (data) => {
        try {
            setLoading(true);


            if (data.image[0]) {
                const formData = new FormData();
                formData.append('image', data.image[0]);

                const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();
                if (result.success) {
                    const imageUrl = result.data.url;
                    console.log('Image URL:', imageUrl);
                    data.image = imageUrl;
                } else {
                    console.error('Image upload failed', result);
                }
            }
            setLoading(false);


            console.log('Form data:', data);
            reset()
        } catch (error) {
            setLoading(false); // End loading state in case of error
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-8 lg:space-y-0 lg:space-x-10">

            {/* Left Side - Sign Up Form */}
            <div className="w-full lg:w-2/3">
                <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

                <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email address'
                                }
                            })}
                            className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Password must be at least 8 characters long' }
                            })}
                            className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    {/* Image Upload Field */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            id="image"
                            {...register('image', { required: 'Profile image is required' })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                        {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
                    </div>

                    {/* Role Select Field */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            {...register('role', { required: 'Role is required' })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        >
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading} // Disable button while loading
                        className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-md 
                            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        {loading ? 'Uploading Image...' : 'Create Account'}
                    </button>
                </form>
            </div>

            {/* Right Side - Social Login Section */}
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center space-y-6 bg-gray-100 p-6 rounded-lg">
                <h2 className="text-2xl font-bold">Or Sign Up Using</h2>

                {/* Google Login Button */}
                <button className="flex items-center w-full justify-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 shadow-md">
                    <FcGoogle className="w-6 h-6 mr-2" />
                    Sign in with Google
                </button>
            </div>

        </div>
    );
};

export default SignUp;

import React from 'react';

const Modal = ({ productToEdit, closeModal, setProductToEdit }) => {

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h3 className="text-xl font-bold mb-4">Edit Product</h3>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={productToEdit.title}
                        onChange={(e) => setProductToEdit({ ...productToEdit, title: e.target.value })}
                        className="w-full p-2 border mb-4"
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        value={productToEdit.price}
                        onChange={(e) => setProductToEdit({ ...productToEdit, price: e.target.value })}
                        className="w-full p-2 border mb-4"
                    />
                </div>
                <div>
                    <label>Category</label>
                    <input
                        type="text"
                        value={productToEdit.category}
                        onChange={(e) => setProductToEdit({ ...productToEdit, category: e.target.value })}
                        className="w-full p-2 border mb-4"
                    />
                </div>

                <div className="flex justify-between">
                    <button onClick={closeModal} className="text-gray-500">Cancel</button>
                    <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
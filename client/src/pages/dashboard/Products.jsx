import React, { useState } from 'react';
import Bar from '../../components/dashboard/Bar';

const Products = () => {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        desc: '',
        price: '',
        image: '',
    });

    const data = [
        { id: 1, name: 'Product 1', category: 'Category 1', desc: 'Description 1', price: 15000000, image: 'Image URL 1' },
        { id: 2, name: 'Product 2', category: 'Category 2', desc: 'Description 2', price: 25000000, image: 'Image URL 2' },
        { id: 3, name: 'Product 3', category: 'Category 3', desc: 'Description 3', price: 35000000, image: 'Image URL 3' },
        { id: 4, name: 'Product 4', category: 'Category 4', desc: 'Description 4', price: 45000000, image: 'Image URL 4' },
        { id: 5, name: 'Product 5', category: 'Category 5', desc: 'Description 5', price: 55000000, image: 'Image URL 5' },
        { id: 6, name: 'Product 6', category: 'Category 6', desc: 'Description 6', price: 65000000, image: 'Image URL 6' },
        { id: 7, name: 'Product 7', category: 'Category 7', desc: 'Description 7', price: 75000000, image: 'Image URL 7' },
        { id: 8, name: 'Product 8', category: 'Category 8', desc: 'Description 8', price: 85000000, image: 'Image URL 8' },
        { id: 9, name: 'Product 9', category: 'Category 9', desc: 'Description 9', price: 95000000, image: 'Image URL 9' },
        { id: 10, name: 'Product 10', category: 'Category 10', desc: 'Description 10', price: 105000000, image: 'Image URL 10' },
    ];

    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditModal = (product) => {
        setEditedProduct(product);
        const imageInput = document.getElementById('image');
        if (imageInput) {
            imageInput.value = '';
        }
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditedProduct(null);
        setIsEditModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const addProduct = () => {
        // Lakukan validasi form jika diperlukan
        // Simpan data produk baru ke dalam state data
        // Reset form input
        // Tutup modal
    };

    const editProduct = () => {
        // Lakukan validasi form jika diperlukan
        // Simpan data produk yang telah diedit ke dalam state data
        // Reset form input
        // Tutup modal penyuntingan
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        const searchText = e.target.value.toLowerCase();
        setSearchText(searchText);

        const filteredData = data.filter((item) =>
            item.name.toLowerCase().includes(searchText)
        );
        setSearchResults(filteredData);
        setCurrentPage(1);
    };

    return (
        <>
            <Bar />

            {/* Content */}
            <div className="p-4 sm:ml-64 mt-14">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div className="mx-10 py-10">
                            <div className='flex justify-between'>
                                <h1 className="text-3xl font-bold mb-5 text-[#ffcb53]">Products</h1>
                                <input
                                    type="text"
                                    className="rounded-xl m-3 border border-[#ffcb53] shadow-md focus:ring-1 focus:ring-[#ffcb53] focus:outline-none placeholder:text-[#ffcb53] placeholder:text-center"
                                    placeholder="Search by name"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className='table-auto w-full text-sm border rounded-xl shadow-md hover:shadow-lg text-center text-black'>
                                    <thead className='text-xs uppercase bg-[#ffcb53] text-white'>
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Id</th>
                                            <th scope="col" className="px-6 py-3">Name</th>
                                            <th scope="col" className="px-6 py-3">Category</th>
                                            <th scope="col" className="px-6 py-3">Description</th>
                                            <th scope="col" className="px-6 py-3">Price</th>
                                            <th scope="col" className="px-6 py-3">Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchText && searchResults.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">Data tidak ditemukan</td>
                                            </tr>
                                        ) : (
                                            searchText ? (
                                                searchResults.map((item) => (
                                                    <tr key={item.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' onClick={() => openEditModal(item)}>
                                                        <td className="px-6 py-4">{item.id}</td>
                                                        <td className="px-6 py-4">{item.name}</td>
                                                        <td className="px-6 py-4">{item.category}</td>
                                                        <td className="px-6 py-4">{item.desc}</td>
                                                        <td className="px-6 py-4">Rp. {(item.price).toLocaleString("id-ID", { currency: "IDR" })}</td>
                                                        <td className="px-6 py-4">
                                                            <img src={item.image} alt={item.name} className="w-10 h-10" />
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                currentItems.map((item) => (
                                                    <tr key={item.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' onClick={() => openEditModal(item)}>
                                                        <td className="px-6 py-4">{item.id}</td>
                                                        <td className="px-6 py-4">{item.name}</td>
                                                        <td className="px-6 py-4">{item.category}</td>
                                                        <td className="px-6 py-4">{item.desc}</td>
                                                        <td className="px-6 py-4">Rp. {(item.price).toLocaleString("id-ID", { currency: "IDR" })}</td>
                                                        <td className="px-6 py-4">
                                                            <img src={item.image} alt={item.name} className="w-10 h-10" />
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className='flex justify-between'>
                                <div className='flex justify-start'>
                                    {/* Tombol "Add Product" yang membuka modal */}
                                    <button
                                        onClick={openModal}
                                        className='mt-5 p-2 rounded-xl text-sm font-bold border shadow-md hover:scale-105 bg-[#ffcb53] text-white'
                                    >
                                        Add Product
                                    </button>
                                </div>

                                <div className='flex justify-end'>
                                    {/* Previous Page Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className='mt-5 p-2 rounded-xl text-sm font-bold border shadow-md hover:scale-105 border-[#ffcb53] text-[#ffcb53]'
                                    >
                                        Previous
                                    </button>
                                    {/* Next Page Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={indexOfLastItem >= data.length}
                                        className='mt-5 ml-2 p-2 rounded-xl text-sm font-bold border shadow-md hover:scale-105 border-[#ffcb53] text-[#ffcb53]'
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal untuk input produk */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg border-t-2 border border-gray-50">
                        <div className='flex justify-between'>
                            <h2 className="text-xl font-bold mb-4 text-[#ffcb53]">Add New Product</h2>
                            <button
                                type="button"
                                onClick={closeModal}
                                className='text-2xl text-[#ffcb53] hover:font-extrabold'
                            >
                                <span className='text-bold'>&#10005;</span>
                            </button>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label htmlFor='name' className="block text-gray-600 text-sm font-semibold mb-2">Nama Product:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={newProduct.name}
                                    onChange={handleInputChange}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-[#ffcb53]"
                                    placeholder='Silahkan Masukan Nama Product'
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor='name' className="block text-gray-600 text-sm font-semibold mb-2">Category Product:</label>
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    value={newProduct.category}
                                    onChange={handleInputChange}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-[#ffcb53]"
                                    placeholder='Silahkan Masukan Category Product'
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor='desc' className="block text-gray-600 text-sm font-semibold mb-2">Deskripsi:</label>
                                <input
                                    type="text"
                                    name="desc"
                                    id="desc"
                                    value={newProduct.desc}
                                    onChange={handleInputChange}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-[#ffcb53]"
                                    placeholder='Silahkan Masukan Deskripsi'
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor='price' className="block text-gray-600 text-sm font-semibold mb-2">Harga:</label>
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-[#ffcb53]"
                                    placeholder='Silahkan Masukan Harga'
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor='image' className="block text-gray-600 text-sm font-semibold mb-2">Gambar:</label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    value={newProduct.image}
                                    onChange={handleInputChange}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-[#ffcb53]"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={addProduct}
                                    className="px-4 py-1 bg-[#ffcb53] text-white rounded-xl font-semibold hover:scale-105 shadow-md"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal untuk penyuntingan produk */}
            {isEditModalOpen && editedProduct && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg border-t-2 border border-gray-50">
                        <div className='flex justify-between'>
                            <h2 className="text-xl font-bold mb-4 text-[#ffcb53]">Edit Product</h2>
                            <button
                                type="button"
                                onClick={closeEditModal}
                                className='text-2xl text-[#ffcb53] hover:font-extrabold'
                            >
                                <span className='text-bold'>&#10005;</span>
                            </button>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label htmlFor='name' className="block text-gray-600 text-sm font-semibold mb-2">Nama Product:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={editedProduct.name}
                                    onChange={handleEditInputChange}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-[#ffcb53]"
                                    placeholder='Silahkan Masukan Nama Product'
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor='name' className="block text-gray-600 text-sm font-semibold mb-2">Category Product:</label>
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    value={editedProduct.category}
                                    onChange={handleEditInputChange}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-[#ffcb53]"
                                    placeholder='Silahkan Masukan Category Product'
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor='desc' className="block text-gray-600 text-sm font-semibold mb-2">Deskripsi:</label>
                                <input
                                    type="text"
                                    name="desc"
                                    id="desc"
                                    value={editedProduct.desc}
                                    onChange={handleEditInputChange}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-[#ffcb53]"
                                    placeholder='Silahkan Masukan Deskripsi'
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor='price' className="block text-gray-600 text-sm font-semibold mb-2">Harga:</label>
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    value={editedProduct.price}
                                    onChange={handleEditInputChange}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-[#ffcb53]"
                                    placeholder='Silahkan Masukan Harga'
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor='image' className="block text-gray-600 text-sm font-semibold mb-2">Gambar:</label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={handleEditInputChange}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-[#ffcb53]"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={editProduct}
                                    className="px-4 py-1 bg-[#ffcb53] text-white rounded-xl font-semibold hover:scale-105 shadow-md"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </ >
    );
};

export default Products;

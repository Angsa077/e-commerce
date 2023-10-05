import React, { useState } from 'react';
import Bar from '../../components/dashboard/Bar';

const Dashboard = () => {
    const [searchText, setSearchText] = useState('');

    const totalPendapatan = 1000;
    const totalPesanan = 50;
    const totalProduk = 200;

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <>
            <Bar />

            {/* Content */}
            <div class="p-4 sm:ml-64 mt-14">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div class="grid grid-cols-1 gap-4 mb-4">
                        <div className="mx-10 py-10">
                            <h1 className="text-3xl font-bold text-[#ffcb53]">Dashboard</h1>
                            <form className="group relative mt-5">
                                <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-[#ffcb53]" aria-hidden="true">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                                </svg>
                                <input
                                    type="text"
                                    className="focus:ring-2 focus:ring-[#ffcb53] focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
                                    aria-label="Filter projects"
                                    placeholder="Cari..."
                                    value={searchText}
                                    onChange={handleSearchChange}
                                />
                            </form>
                            <div className="mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                    {[
                                        { label: 'Total Pendapatan:', value: `$${totalPendapatan}` },
                                        { label: 'Total Pesanan:', value: totalPesanan },
                                        { label: 'Total Produk:', value: totalProduk },
                                        { label: 'Total Produk:', value: totalProduk },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 text-center py-8"
                                        >
                                            <p className="text-lg font-semibold">{item.label}</p>
                                            <p className="text-2xl font-bold">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
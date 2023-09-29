import React, { useState, useEffect, useRef } from "react";

const ToggleProduct = () => {
    const initialProducts = [
        "Web ERP", "Web Kasir", "Web Penjualan", "Web CRM", "Web Karyawan",
        "Web Inventori", "Web Sewa", "Web Company Profile", "Web Pendidikan",
        "Web Streaming", "E-Commerce", "Gallery"
    ];

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleRef = useRef(null);

    const toggleProducts = () => {
        setIsExpanded(!isExpanded);
    };

    // Set event listener untuk menutup dropdown saat klik di luar area button
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (toggleRef.current && !toggleRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={toggleRef}>
            <button onClick={toggleProducts}>Produk</button>
            {isExpanded && (
                <ul className="text-black text-sm sm:absolute top-12 right-0 bg-white w-40 rounded-xl p-2 shadow-lg border-t-2 border-t-gray-100">
                    {initialProducts.map((product, index) => (
                        <li key={index} className="py-1 px-2 hover:bg-gray-100 hover:rounded-md hover:font-bold">{product}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ToggleProduct;

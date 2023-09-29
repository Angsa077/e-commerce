import React, { useState, useEffect, useRef } from "react";

const ToggleJasa = () => {
    const initialJasa = [
        "Pembuatan Kartu Nama",
        "Pembuatan Skripsi"
    ];

    const [categoryJasa, setCategoryJasa] = useState(initialJasa);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleRef = useRef(null);

    const ToggleJasas = () => {
        setIsExpanded(!isExpanded);
    };

    // set event listener untuk hapus fungsi klik di luar area button
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
            <button onClick={ToggleJasas}>
                {isExpanded ? "Jasa" : "Jasa"}
            </button>
            {isExpanded && (
                <ul className="text-black text-sm sm:absolute top-12 right-0 bg-white w-40 rounded-xl p-2 shadow-lg border-t-2 border-t-gray-100">
                    {categoryJasa.map((jasa, index) => (
                        <li key={index} className="py-1 px-2 hover:bg-gray-100 hover:rounded-md hover:font-bold">{jasa}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ToggleJasa;

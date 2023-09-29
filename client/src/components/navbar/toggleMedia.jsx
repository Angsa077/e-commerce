import React, { useState, useEffect, useRef } from "react";

const ToggleMedia = () => {
    const initialMedia = [
        "Blog",
        "About Me"
    ];

    const [categoryMedia, setCategoryMedia] = useState(initialMedia);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleRef = useRef(null);

    const ToggleMedias = () => {
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
            <button onClick={ToggleMedias}>
                {isExpanded ? "Media" : "Media"}
            </button>
            {isExpanded && (
                <ul className="text-black text-sm sm:absolute top-12 right-0 bg-white w-40 rounded-xl p-2 shadow-lg border-t-2 border-t-gray-100">
                    {categoryMedia.map((media, index) => (
                        <li key={index} className="py-1 px-2 hover:bg-gray-100 hover:rounded-md hover:font-bold">{media}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ToggleMedia;

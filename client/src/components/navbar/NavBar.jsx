import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../../store/reducers/authSlice";
import { toast } from "react-toastify";

// toggle
import ToggleProduct from "./toggleProducts";
import ToggleJasa from "./toggleJasa";
import ToggleProgram from "./toggleProgram";
import ToggleMedia from "./toggleMedia";

// icons
import { PiShoppingCart } from "react-icons/pi";
import { BiSearchAlt } from "react-icons/bi";
import { HiUser } from "react-icons/hi2";
import { AiTwotoneStar } from "react-icons/ai";
import { FaCoffee } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoMdPricetags } from "react-icons/io";
import { LiaBlogSolid } from "react-icons/lia";

const NavBar = () => {
    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function MenuItemMobile({ icon, text }) {
        return (
            <li className="flex items-center space-x-3 p-2 hover:bg-gray-100 hover:rounded-md hover:font-bold">
                {icon}
                <span>{text}</span>
            </li>
        );
    }

    function MenuItemFull({ icon, text }) {
        return (
            <li className="flex items-center space-x-1">
                {icon}
                <span>{text}</span>
            </li>
        );
    }


    return (
        <nav className="fixed top-0 w-full h-14 gradientBG text-white font-semibold flex justify-between items-center shadow-md">
            <Link to="/" className="flex justify-start mx-8">
                <h2 className="hover:text-black transition-colors duration-300 text-2xl sm:text-sm md:text-md lg:text-lg xl:text-2xl">Dr Chip</h2>
            </Link>

            {/* Tampilan Mobile */}
            <button onClick={toggleMenu} className="sm:hidden flex items-center mr-10 text-2xl">
                {isMenuOpen ? (
                    <span className="text-red-500">&#10005;</span>
                ) : (
                    <span>&#9776;</span>
                )}
            </button>

            <div className={`${isMenuOpen ? "fixed" : "hidden"} sm:hidden`}>
                <ul className="text-black text-md absolute  bg-white w-96 rounded-xl p-1 shadow-lg border-t-2 border-t-gray-100 ml-24 mt-8">
                    <Link to="/">
                        <MenuItemMobile icon={<IoHome size={18} />} text="Home" />
                    </Link>
                    <Link to="/login" >
                        <MenuItemMobile icon={<HiUser size={18} />} text="Akun" />
                    </Link>
                    <MenuItemMobile icon={<IoMdPricetags size={18} />} text={<ToggleProduct />} />
                    <MenuItemMobile icon={<FaCoffee size={18} />} text={<ToggleJasa />} />
                    <MenuItemMobile icon={<AiTwotoneStar size={18} />} text={<ToggleProgram />} />
                    <MenuItemMobile icon={<LiaBlogSolid size={18} />} text={<ToggleMedia />} />
                </ul>
            </div>

            {/* tampilan full */}
            <ul className={"hidden sm:flex sm:space-x-12 mx-8 bg"}>
                <Link to="/" className="mt-0.5">
                    <MenuItemFull icon={<IoHome size={18} />} />
                </Link>
                <MenuItemFull icon={<BiSearchAlt size={18} />} />
                <MenuItemFull icon={<IoMdPricetags size={18} />} text={<ToggleProduct />} />
                <MenuItemFull icon={<FaCoffee size={18} />} text={<ToggleJasa />} />
                <MenuItemFull icon={<AiTwotoneStar size={18} />} text={<ToggleProgram />} />
                <MenuItemFull icon={<LiaBlogSolid size={18} />} text={<ToggleMedia />} />
                <li className="relative flex items-center">
                    <Link to="/cart">
                        <PiShoppingCart size={23} />
                        <span className="bg-white text-black rounded-full w-4 h-4 flex items-center justify-center transform hover:scale-110 hover:shadow-md transition-all duration-300 absolute -top-2 -right-2">
                            <span className="text-xs text-yellow-300 font-bold">{cartTotalQuantity}</span>
                        </span>
                    </Link>
                </li>

                {
                    auth._id ? (
                        <button
                            type="button"
                            onClick={() => {
                                dispatch(logout(null));
                                toast.warning("Logged Out!", { position: "bottom-left" })
                            }}
                        >
                            Logout</button>
                    ) : (
                        <Link to="/login">
                            <MenuItemFull icon={<HiUser size={18} />} text="Akun" />
                        </Link>
                    )
                }
            </ul>
        </nav>
    );
};

export default NavBar;

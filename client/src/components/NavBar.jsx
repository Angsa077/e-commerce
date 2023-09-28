import { Link } from "react-router-dom";
import { PiShoppingCart } from "react-icons/pi";

const NavBar = () => {
    return (
        <nav className="fixed top-0 w-full h-14 gradientBG text-white font-semibold flex justify-between items-center transition-all duration-300 ease-in-out shadow-md">
            <Link to="/" className="flex justify-start mx-5">
                <h2 className="text-2xl hover:text-black">Dr Chip</h2>
            </Link>
            <Link to="/cart" className="flex justify-end mx-5 relative">
                <PiShoppingCart size={30} />
                <span className="bg-white text-black rounded-full w-5 h-5 flex items-center justify-center hover:bg-black hover:text-white absolute -top-2 -right-2">
                    <span>3</span>
                </span>
            </Link>
        </nav>
    );
};

export default NavBar;

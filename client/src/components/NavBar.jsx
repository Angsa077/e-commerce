import { Link } from "react-router-dom";
import { PiShoppingCart } from "react-icons/pi"

const NavBar = () => {
    return (
        <div className="flex h-14 gradientBG text-white font-semibold justify-between items-center">
            <Link to="/" className="flex justify-start mx-5">
                <h2 className="text-2xl hover:text-black">Dr Chip</h2>
            </Link>
            <Link to="/cart" className="flex justify-end mx-5">
                <div >
                    <PiShoppingCart size={30}  />
                </div>
                <span className="bg-white text-black rounded-full w-5 h-5 flex items-center justify-center hover:bg-black hover:text-white">
                    <span>3</span>
                </span>
            </Link>
        </div>
    )
}

export default NavBar

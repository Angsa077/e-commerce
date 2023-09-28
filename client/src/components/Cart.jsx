import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const cart = useSelector((state) => state.cart);

    return (
        <div className="container mx-auto py-8 mt-16">
            <div className="mx-8 sm:mx-8 md:mx-8 lg:mx-8 xl:mx-28 rounded-xl p-5 shadow-md border-t-2">
                <div className="flex justify-center items-center mb-0 sm:mb-8">
                    <div className="text-center font-bold text-3xl px-5 text-yellow-400">
                        Shopping Cart
                    </div>
                </div>

                {cart.cartItems.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">Your cart is empty</p>
                        <Link to="/" className="text-blue-500 hover:underline">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 border-b border-gray-300 pb-4 mb-4 w-full text-yellow-400 font-semibold ">
                                <h3 className="hidden sm:col-span-3 mx-0 sm:mx-8 sm:block">Product</h3>
                                <h3 className="hidden sm:block">Price</h3>
                                <h3 className="hidden sm:block">Quantity</h3>
                                <h3 className="hidden sm:block">Total</h3>
                            </div>

                            <div>
                                {cart.cartItems?.map((cartItem) => (
                                    <div
                                        key={cartItem.id}
                                        className="w-full grid grid-cols-1 sm:grid-cols-6 border-b border-gray-300 py-4 mx-3 hover:bg-gray-50 transition duration-150 ease-in-out transform hover:scale-105 rounded-xl"
                                    >
                                        <div className="flex items-center space-x-4 sm:col-span-3">
                                            <img
                                                src={cartItem.image}
                                                alt={cartItem.name}
                                                className="w-40 md:w-40 sm:w-36 h-24 md:h-24 sm:h-20 ml-2 sm:ml-5 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h3 className="font-bold">
                                                    {cartItem.name}
                                                </h3>
                                                <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-md text-gray-600 my-1">
                                                    {cartItem.desc}
                                                </p>
                                                <button className="text-red-500 hover:text-red-700 hover:underline cursor-pointer flex">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-gray-800 text-sm md:text-md lg:text-md xl:text-base font-semibold ">
                                            <div className="hidden sm:flex">
                                                Rp. {cartItem.price.toLocaleString("id-ID", { currency: "IDR" })}
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="hidden sm:flex">
                                                <button className="text-gray-600 hover:text-gray-800 cursor-pointer border rounded-md px-2 sm:px-3 py-1 transition duration-300 ease-in-out transform hover:scale-105">
                                                    -
                                                </button>
                                                <div className="text-sm m-1 mt-2 font-semibold">
                                                    {cartItem.cartQuantity}
                                                </div>
                                                <button className="text-gray-600 hover:text-gray-800 cursor-pointer border rounded-md px-2 sm:px-3 py-1 transition duration-300 ease-in-out transform hover:scale-105">
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-start">
                                            <div className="flex items-center mt-3 mx-3 sm:mx-0 justify-end sm:justify-start text-gray-800 text-sm md:text-md lg:text-md xl:text-base font-semibold ">
                                                <div className="flex sm:hidden">
                                                    <button className="text-gray-600 hover:text-gray-800 cursor-pointer border rounded-md px-2 sm:px-3 py-1 transition duration-300 ease-in-out transform hover:scale-105">
                                                        -
                                                    </button>
                                                    <div className="mx-2 mt-1 font-semibold">
                                                        {cartItem.cartQuantity}
                                                    </div>
                                                    <button className="text-gray-600 hover:text-gray-800 cursor-pointer border rounded-md px-2 sm:px-3 py-1 transition duration-300 ease-in-out transform hover:scale-105">
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mx-5 sm:mx-0 text-gray-800 text-sm md:text-md lg:text-md xl:text-base font-semibold">
                                                Rp. {(cartItem.price * cartItem.cartQuantity).toLocaleString("id-ID", { currency: "IDR" })}
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <button className="bg-red-500 text-white px-2 sm:px-3 py-1 mx-2 sm:mx-5 rounded-lg hover:bg-red-600 hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                Clear Cart
                            </button>
                            <div className="flex justify-end space-x-2">
                                <span className="font-semibold">Subtotal</span>
                                <span className="font-semibold">Rp. {cart.cartTotal}</span>
                            </div>
                            <div className="mt-4 text-end">
                                <p className="text-gray-600 text-sm">Tax and shipping calculated at checkout</p>
                                <button className="bg-yellow-400 px-2 sm:px-3 py-1 mt-3 text-white rounded-lg hover:bg-yellow-500 hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105">Checkout</button>
                                <div>
                                    <Link to="/" className="text-yellow-500 hover:underline mt-2 inline-block text-end">Continue Shopping</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;

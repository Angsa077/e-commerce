import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai"
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../store/reducers/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const dispacth = useDispatch();
    const navigate = useNavigate();

    const [token, setToken] = useState("");

    useEffect(() => {
        dispacth(getTotals());
    }, [cart, dispacth]);

    const handleRemoveFromCart = (cartItem) => {
        dispacth(removeFromCart(cartItem));
    };
    const handleDecreaseCart = (cartItem) => {
        dispacth(decreaseCart(cartItem));
    }
    const handleIncreaseCart = (cartItem) => {
        dispacth(addToCart(cartItem));
    }
    const handleClearCart = () => {
        dispacth(clearCart());
    }

    const generateOrderId = () => {
        const timestamp = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * 1000);
        return `ORDER-${timestamp}-${randomNumber}`;
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const data = {
                order_id: generateOrderId(),
                name : e.target.name.value,
                total  : cart.cartTotalAmount
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const response = await axios.post("http://localhost:5000/api/payment/process-transaction", data, config);
            setToken(response.data.token);
        } catch (error) {
            console.error("Error initiating payment", error);
        }
    }

    useEffect(() => {
        if(token) {
            window.snap.pay(token, {
                onSuccess: (result) => {
                    localStorage.setItem("Pembayaran", JSON.stringify(result));
                    setToken("");
                },
                onPending: (result) => {
                    localStorage.setItem("Pembayaran", JSON.stringify(result));
                    setToken("");
                },
                onError: (error) => {
                    console.log(error);
                    setToken("");
                },
                onClose: () => {
                    console.log("Anda belum menyelesaikan pembayaran");
                    setToken("");
                }
            });
        }
    }, [token]);

    useEffect(() => {
        const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransUrl;

        const midtransClientKey = "SB-Mid-client-NFdN8OSSRRg6YqZ7";
        scriptTag.setAttribute("data-client-key", midtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        }
    }, [])


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
                        <Link to="/" className="text-yellow-400 hover:font-bold">
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
                                <h3 className="hidden sm:block text-end mr-7">Total</h3>
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
                                                <button
                                                    className="text-sm text-red-400 hover:font-bold cursor-pointer flex"
                                                    onClick={() => handleRemoveFromCart(cartItem)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-gray-800 text-xs md:text-sm lg:text-base">
                                            <div className="hidden sm:flex">
                                                Rp. {cartItem.price.toLocaleString("id-ID", { currency: "IDR" })}
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="hidden sm:flex">
                                                <button
                                                    className="text-gray-600 hover:text-gray-800 cursor-pointer border rounded-md px-2 sm:px-3 py-1 transition duration-300 ease-in-out transform hover:scale-105"
                                                    onClick={() => handleDecreaseCart(cartItem)}
                                                >
                                                    -
                                                </button>
                                                <div className="text-sm m-1 mt-2 font-semibold">
                                                    {cartItem.cartQuantity}
                                                </div>
                                                <button
                                                    className="text-gray-600 hover:text-gray-800 cursor-pointer border rounded-md px-2 sm:px-3 py-1 transition duration-300 ease-in-out transform hover:scale-105"
                                                    onClick={() => handleIncreaseCart(cartItem)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end">
                                            <div className="flex items-center mt-3 mx-3 sm:mx-0 justify-end sm:justify-start text-gray-800 text-sm md:text-md lg:text-md xl:text-base font-semibold ">
                                                <div className="flex sm:hidden">
                                                    <button
                                                        className="text-gray-600 hover:text-gray-800 cursor-pointer border rounded-md px-2 sm:px-3 py-1 transition duration-300 ease-in-out transform hover:scale-105"
                                                        onClick={() => handleDecreaseCart(cartItem)}
                                                    >
                                                        -
                                                    </button>
                                                    <div className="mx-2 mt-1 font-semibold">
                                                        {cartItem.cartQuantity}
                                                    </div>
                                                    <button
                                                        className="text-gray-600 hover:text-gray-800 cursor-pointer border rounded-md px-2 sm:px-3 py-1 transition duration-300 ease-in-out transform hover:scale-105"
                                                        onClick={() => handleIncreaseCart(cartItem)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mx-5 sm:mx-7 flex items-center text-gray-800 font-bold text-md sm:text-xs md:text-sm lg:text-base">
                                                Rp. {(cartItem.price * cartItem.cartQuantity).toLocaleString("id-ID", { currency: "IDR" })}
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <button
                                className="border-2 border-red-300 px-4 py-1 mx-5 rounded-lg text-sm text-red-300 font-light transition duration-300 ease-in-out hover:scale-105"
                                onClick={() => handleClearCart()}
                            >
                                Clear Cart
                            </button>
                            <div className="grid grid-cols-12 mx-5">
                                <div className="col-span-12 lg:col-span-10 lg:col-start-10">
                                    <div className="flex justify-between text-lg font-bold mt-3">
                                        <span className="">Subtotal</span>
                                        <span className="">Rp. {(cart.cartTotalAmount).toLocaleString("id-ID", { currency: "IDR" })}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 py-2">Tax and shipping calculated at checkout</p>

                                    {auth._id ? (
                                        <form onSubmit={handlePayment}>
                                            <div className="mb-3">
                                                <label htmlFor="name" className="block text-gray-600 text-sm">Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={auth.name}
                                                    onChange={(e) => { }}
                                                />
                                            </div>
                                            <button type="submit" className="bg-yellow-400 text-white w-full p-1.5 rounded-xl text-sm transition font-bold duration-300 ease-in-out hover:scale-105">
                                                Proceed to Payment
                                            </button>
                                        </form>
                                    ) : (
                                        <button
                                            type="button"
                                            className="bg-yellow-400 text-white w-full p-1.5 rounded-xl text-sm transition font-bold duration-300 ease-in-out hover:scale-105"
                                            onClick={() => navigate("/login")}
                                        >
                                            Login to Check out</button>
                                    )}

                                    <div className="mt-3 text-sm transition duration-300 ease-in-out hover:scale-105">
                                        <a href="/" className="text-yellow-400 flex"><AiOutlineArrowLeft className="mt-0.5 mr-2" /> <span className="">Continue Shopping</span></a>
                                    </div>
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

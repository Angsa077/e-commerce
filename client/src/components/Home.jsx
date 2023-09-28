import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../features/productsApi";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../features/cartSlice";

const Home = () => {
    const { data, isLoading, isError } = useGetProductsQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate("/cart");
    }

    return (
        <div>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : isError ? (
                <h1>An error occurred</h1>
            ) : (
                <>
                    <div className="flex justify-center items-center mt-20">
                        <div className="text-center font-bold text-3xl hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 rounded-full px-5 hover:font-extrabold text-yellow-400">
                            My Products
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center items-center text-center mt-2">
                        {data.map((product) => (
                            <div key={product.id} className="w-3/4 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/5 m-5">
                                <div className="border rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                                    <img src={product.image} alt={product.name} className="rounded-t-lg" />
                                    <div className="p-4">
                                        <h3 className="font-bold">{product.name}</h3>
                                        <p className="text-sm mt-2 mb-4">{product.desc}</p>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between items-center p-4">
                                        <span className="text-md font-semibold">Rp. {product.price.toLocaleString("id-ID", { currency: "IDR" })}</span>
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-2.5 rounded-full w-10 h-10"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;

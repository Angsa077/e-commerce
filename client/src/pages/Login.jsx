import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/reducers/authSlice';
import NavBar from "../components/navbar/NavBar";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (auth._id) {
            navigate("/cart");
        }
    }, [auth._id, navigate]);

    const submitHandle = (e) => {
        e.preventDefault();
        dispatch(login(user))
    }
    return (
        <>
            <NavBar />
            <div className="min-h-screen flex justify-center items-center">
                <div className="bg-white shadow-md rounded-xl p-16 border-t-2">
                    <h2 className="text-2xl font-bold mb-4 text-center ">Login</h2>
                    <form className="space-y-4" onSubmit={submitHandle}>
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-yellow-300"
                                placeholder="example@mail.com"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-yellow-300"
                                placeholder="******"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                type="submit"
                                className=" bg-yellow-400  text-white font-bold py-1 text-md px-4 rounded-xl w-full hover:scale-105 mt-2"
                            >
                                {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
                            </button>
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-xs mx-1'>Don't have an account?</p>
                            <Link to="/register">
                                <p className='text-yellow-500 text-xs'>Register</p>
                            </Link>
                        </div>
                    </form>

                    {auth.loginError ? (
                        <p className={`text-white text-center text-xs bg-red-500 p-1 mt-2 rounded-xl transform translate-y-0 transition-transform ease-in-out duration-300 hover:scale-105 hover:bg-red-600 hover:font-bold ${!auth.loginError.message ? 'hidden' : ''}`}>
                            {auth.loginError.message}
                        </p>
                    ) : null}

                </div>
            </div>
        </>
    );
}

export default Login;

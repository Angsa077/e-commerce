import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-white shadow-md rounded-xl px-20 py-16 border-t-2">
                <h2 className="text-2xl font-bold mb-8 text-center">Register</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Nama Lengkap</label>
                        <input
                            id="name"
                            type="text"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-yellow-300"
                            placeholder="Angga Saputra"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-yellow-300"
                            placeholder="example@mail.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-yellow-300"
                            placeholder="******"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-yellow-300"
                            placeholder="******"
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className=" bg-yellow-400  text-white font-bold py-1 text-md px-4 rounded-xl w-full hover:scale-105 mt-2"
                        >
                            Register
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-xs mx-1'>Don't have an account?</p>
                        <Link to="/login">
                            <p className='text-yellow-500 text-xs'>Login</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;

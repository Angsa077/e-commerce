import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <>
        <NavBar />
        <div className="flex justify-center min-h-screen items-center flex-col">
            <h1 className="text-3xl font-bold">404</h1>
            <p className="text-xl">Page not found</p>
            <button onClick={handleGoHome} className="text-yellow-300 hover:scale-105 hover:font-bold">
                Go Home
            </button>
        </div>
        </>
    );
};

export default NotFound
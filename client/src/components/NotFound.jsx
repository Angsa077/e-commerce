import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex justify-center min-h-screen items-center flex-col">
            <h1 className="text-3xl font-bold">404</h1>
            <p className="text-xl">Page not found</p>
            <button onClick={handleGoHome} className="text-blue-500 hover:underline">
                Go Home
            </button>
        </div>
    );
};

export default NotFound
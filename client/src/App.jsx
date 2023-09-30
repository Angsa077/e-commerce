import './App.css'
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

//pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NavBar from "./components/navbar/NavBar";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from './pages/Register';


function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

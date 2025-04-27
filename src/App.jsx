import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

import Login from "./login/login";
import Home from "./pages/home";
import Category from "./pages/category";
import Discaunt from "./pages/discaunt";

function App() {
  const tokens = localStorage.getItem("tokenInfo");
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens && location.pathname !== "/") {
      // Token yo'q bo'lsa va login pageda bo'lmasak, login pagega qaytaramiz
      navigate("/");
    } 
    if (tokens && location.pathname === "/") {
      // Agar token bor bo'lsa va login sahifada bo'lsak, homega o'tamiz
      navigate("/home");
    }
  }, [tokens, navigate, location.pathname]);

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<Category />} /> 
            <Route path="category" element={<Category />} />
            <Route path="discaunt" element={<Discaunt />} />
            
          </Route>
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;

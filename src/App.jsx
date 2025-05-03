import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

import Login from "./login/login";
import Home from "./pages/home";
import Category from "./pages/category";
import Discaunt from "./pages/discaunt";
import Size from "./pages/size";
import Colors from "./pages/colors";
import Faq from "./pages/faq";
import Contact from "./pages/contact";
import Team from "./pages/team";
import News from "./pages/news";
import Product from "./pages/product";

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
            <Route path="size" element={<Size />} />
            <Route path="colors" element={<Colors />} />
            <Route path="faq" element={<Faq />} />
            <Route path="contact" element={<Contact />} />
            <Route path="team" element={<Team />} />
            <Route path="news" element={<News />} />
            <Route path="product" element={<Product />} />
            
          </Route>
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;

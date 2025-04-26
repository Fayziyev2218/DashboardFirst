import { Routes, Route, useNavigate } from "react-router-dom";
import { route } from "./route";
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";

function App() {
  const tokens = localStorage.getItem("tokenInfo");
  const navigate = useNavigate();

  useEffect(() => {
    if (tokens) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [tokens, navigate]);

  return (
    <>
      <main>
        <Routes>
          {
            route.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))
          }
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;

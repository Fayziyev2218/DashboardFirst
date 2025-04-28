import { Link, Outlet, useNavigate } from "react-router-dom";
import Saytbar from "../componets/saytbar";

export default function Home() {
  const navigate = useNavigate();
  const logoutfunction = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="home-layout flex">
      <Saytbar /> 
      <div className="content bg-gray-100 w-[81%] ml-auto">
        <div className="my-[16px] py-[8px] mr-[24px] flex justify-end">
          <button
            className="py-2 px-4 bg-red-600 rounded-lg text-white hover:bg-red-700"
            onClick={logoutfunction}
          >
            Log out
          </button>
        </div>
        <div className="mx-auto px-[24px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

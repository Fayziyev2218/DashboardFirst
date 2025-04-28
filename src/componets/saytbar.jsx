import { NavLink } from "react-router-dom";
import logo from "/logo.png";

export default function Saytbar() {
  return (
    <div className="bg-gray-800 p-4 w-64 h-screen fixed top-0 left-0 flex flex-col items-center">
  <img className="w-[80px] h-[80px] mb-4" src={logo} alt="logo" />
  <ul className="w-full">
    <li className="mb-[10px]">
      <NavLink
        index="true"
        to="category"
        className={({ isActive }) =>
          isActive
            ? "bg-green-500 text-white rounded-md px-4 py-2 block transition-all"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 block transition-all"
        }
      >
        Category
      </NavLink>
    </li>
    <li className="mb-[10px]">
      <NavLink
        to="discaunt"
        className={({ isActive }) =>
          isActive
            ? "bg-green-500 text-white rounded-md px-4 py-2 block transition-all"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 block transition-all"
        }
      >
        Discount
      </NavLink>
    </li>
    <li className="mb-[10px]">
      <NavLink
        to="size"
        className={({ isActive }) =>
          isActive
            ? "bg-green-500 text-white rounded-md px-4 py-2 block transition-all"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 block transition-all"
        }
      >
        Size
      </NavLink>
    </li>
    <li className="mb-[10px]">
      <NavLink
        to="colors"
        className={({ isActive }) =>
          isActive
            ? "bg-green-500 text-white rounded-md px-4 py-2 block transition-all"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 block transition-all"
        }
      >
        Colors
      </NavLink>
    </li>
    <li className="mb-[10px]">
      <NavLink
        to="faq"
        className={({ isActive }) =>
          isActive
            ? "bg-green-500 text-white rounded-md px-4 py-2 block transition-all"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 block transition-all"
        }
      >
        FAQ
      </NavLink>
    </li>
    <li className="mb-[10px]">
      <NavLink
        to="contact"
        className={({ isActive }) =>
          isActive
            ? "bg-green-500 text-white rounded-md px-4 py-2 block transition-all"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 block transition-all"
        }
      >
        Contact
      </NavLink>
    </li>
    <li className="mb-[10px]">
      <NavLink
        to="team"
        className={({ isActive }) =>
          isActive
            ? "bg-green-500 text-white rounded-md px-4 py-2 block transition-all"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 block transition-all"
        }
      >
        Team
      </NavLink>
    </li>
    <li className="mb-[10px]">
      <NavLink
        to="news"
        className={({ isActive }) =>
          isActive
            ? "bg-green-500 text-white rounded-md px-4 py-2 block transition-all"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 block transition-all"
        }
      >
        News
      </NavLink>
    </li>
  </ul>
</div>

  );
}

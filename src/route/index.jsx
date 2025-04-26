import Login from "../login/login";
import Home from "../pages/home";


export const route = [
    {
        path:"/home",
        element:<Home/>
    },
    {
        path:"/",
        element:<Login/>
    }
]
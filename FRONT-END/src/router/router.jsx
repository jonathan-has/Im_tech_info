import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Mainlayout } from "../layouts/Mainlayout";
import {Authlayout} from '../layouts/Authlayout';
import {Home} from "../pages/Home";
import {Contact} from '../pages/Contact';
import {Propos} from '../pages/Propos';
import {Supports} from '../pages/Supports';
import {Formations} from '../pages/Formations';
// Dans Authlayout
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
export const router = createBrowserRouter([
    {
        path:"/",
        element: <Mainlayout/>,
        children: [
            {
                path: "/",
                element:<Home/>
            },
            {
                path:'/Formations',
                element:<Formations/>
            },
            {
                path:'/Supports',
                element:<Supports/>
            },
            {
                path:'/Contact',
                element:<Contact/>
            },
            {
                path:'/Propos',
                element:<Propos/>
            },
        ]
    },
    {
        path:'/',
        element:<Authlayout/>,
        children: [
            {
                path:'/Register',
                element:<Register/>
            },
            {
                path:'/Login',
                element:<Login/>
            }
        ]
    }

])

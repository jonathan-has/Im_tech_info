import { createBrowserRouter } from "react-router-dom";
import { Mainlayout } from "../layouts/Mainlayout";
import { Authlayout } from "../layouts/Authlayout";
import { Dashlayout } from "../layouts/DashLayout";

// Mainlayout
import { Home } from "../pages/Home";
import { Contact } from "../pages/Contact";
import { Propos } from "../pages/Propos";
import { Supports } from "../pages/Supports";
import { Formations } from "../pages/Formations";

// Authlayout
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";

// Dashlayout
import { Superadmin } from "../pages/dashboard/SuperAdmin/Superadmin";
import { Teacher } from "../pages/dashboard/Enseignants/Teacher";
import { Etudiants } from "../pages/dashboard/Etudiants/Etudiants";

// SuperAdmin sous-pages
import { Dashsuperadmin } from "../pages/dashboard/SuperAdmin/Dashsuperadmin";
import { Enseignants } from "../pages/dashboard/SuperAdmin/Enseignants";
import { Formations_sa } from "../pages/dashboard/SuperAdmin/Formations_sa";
import { Supports_sa } from "../pages/dashboard/SuperAdmin/Supports_sa";
import { User } from "../pages/dashboard/SuperAdmin/User";


// Enseignants sous-pages
import {Dashteach} from '../pages/dashboard/Enseignants/Dashteach';
import {Formations_t} from '../pages/dashboard/Enseignants/Formation_t';
import { Supports_t } from "../pages/dashboard/Enseignants/Supports_t";

// Etudiants sous-pages
import { Formations_etu } from "../pages/dashboard/Etudiants/Formations_etu";
import { Supports_etu } from "../pages/dashboard/Etudiants/Supports_etu";

// Pour la protection des routes
import { ProtectedRoute } from "../security/ProtectedRoutes";

export const router = createBrowserRouter([
  // 1. Pages Publiques
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        index: true, // remplacement de path: "/" pour la page par défaut
        element: <Home />,
      },
      {
        path: "formations",
        element: <Formations />,
      },
      {
        path: "supports",
        element: <Supports />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "propos",
        element: <Propos />,
      },
    ],
  },

  // 2. Authentification
  {
    element: <Authlayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },

  // 3. Tableau de bord (Dashboard)
  {
    path: "dashboard",
    element: <Dashlayout />,
    children: [
      {
        element: <ProtectedRoute role='superadmin'/>,
        children:[
          {
            path: "superadmin",
            element: <Superadmin />,
            children: [
              {
                path: "dashsuperadmin",
                element: <Dashsuperadmin />,
              },
              {
                path: "formations",
                element: <Formations_sa />,
              },
              {
                path: "enseignants",
                element: <Enseignants />,
              },
              {
                path: "supports",
                element: <Supports_sa />,
              },
              {
                path: "Utilisateurs",
                element: <User/>,
              }
            ]
          },
          ],
      },
      {
        element: <ProtectedRoute role='enseignants'/>,
        children: [
          {
            path: "teacher",
            element: <Teacher />,
            children:
            [
              {
                path:"dashteach",
                element:<Dashteach/>,
              },
              {
                path:"formations",
                element:<Formations_t/>,
              },
              {
                path:"supports",
                element:<Supports_t/>,
              },
            ]
          },
        ]
      },
      {
        element: <ProtectedRoute role='etudiants'/>,
        children: [
          {
            path: "etudiants",
            element: <Etudiants />,
            children: 
            [
              {
                path: "formations",
                element: <Formations_etu/>,
              },
              {
                path: "supports",
                element: <Supports_etu/>,
              },
            ]
          },
        ]
      },
    ],
  },
]);
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
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
import { Admin } from "../pages/dashboard/Admin";
import { Teacher } from "../pages/dashboard/Teacher";
import { Etudiants } from "../pages/dashboard/Etudiants";

// SuperAdmin sous-pages
import { Dashsuperadmin } from "../pages/dashboard/SuperAdmin/Dashsuperadmin";
import { Enseignants } from "../pages/dashboard/SuperAdmin/Enseignants";
import { Etudiants_sa } from "../pages/dashboard/SuperAdmin/Etudiants_sa";
import { Formations_sa } from "../pages/dashboard/SuperAdmin/Formations_sa";
import { Supports_sa } from "../pages/dashboard/SuperAdmin/Supports_sa";

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
            path: "etudiants",
            element: <Etudiants_sa />,
          },
          {
            path: "supports",
            element: <Supports_sa />,
          },
        ],
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "teacher",
        element: <Teacher />,
      },
      {
        path: "etudiants",
        element: <Etudiants />,
      },
    ],
  },
]);
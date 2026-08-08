import { Navigate,Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; //pour decoder le token

export const ProtectedRoute = ({role}) => {
    const userData = localStorage.getItem('user'); //pour le test
    // const token = localStorage.getItem('token'); //le back serait pret

    // si pas de token ou pas connecté
    // if (!token) {
    //     return <Navigate to='/Login' replace />;
    // }
    if (!userData) {
        return <Navigate to='/Login' replace />;
    }

    // Décodage du token nécessaire quand le back est actif
    // const user = jwtDecode(token);
    

    // test
    // transformer le json en objet js
    const user = JSON.parse(userData);
    // Vérification du rôle 
    // 1 - si user n'a pas le vrai rôle il sera renvoye directement a home
    if (user.role !== role) {
        return <Navigate to='/' replace />;
    }
    // 2 - si tout est ok
    return <Outlet/>;
}
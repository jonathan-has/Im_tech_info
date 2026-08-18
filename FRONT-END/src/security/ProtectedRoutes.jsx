import { Navigate,Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; //pour decoder le token

export const ProtectedRoute = ({role}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <Navigate to='/Login' replace />;
    }
    console.log(user);
    
    // Vérification du rôle 
    // 1 - si user n'a pas le vrai rôle il sera renvoye directement a home
    if (!user) {
        return <Navigate to='/' replace />;
    }
    let ROle = [];
    if (Array.isArray(role)) {
        ROle = role.map(function(item){
            return String(item).toLowerCase();
        });
    }else {
        ROle = [String(role).toLowerCase()]
    }
    // si il est json

    const userRole = String(user).toLowerCase();
    if (!ROle.includes(userRole)){
        return <Navigate to='/' replace />;
    }
    // 2 - si tout est ok il renvoie vers la page suivante
    return <Outlet/>;

}
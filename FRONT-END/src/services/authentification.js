const API_URL = "http://localhost:3000";
import {jwtDecode} from 'jwt-decode';
export const login = async (email, password) =>{
    try {
        const reponse = await fetch(`${API_URL}/auth/Login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password}) //transformer les donnees js en json

        });
        const data = await reponse.json(); //retransforme les donnees en objet js comme parse
        // !reponse.ok signifie : "Si le serveur nous renvoie un code d'erreur (HTTP 4xx ou 5xx)". =)false
        
        if (reponse.ok) {
            // Sauvegarde des identifiants dans la mémoire du navigateur
            if (data.token) {
              localStorage.setItem('token', data.token); //recuperation
            }
            const decodeToken = jwtDecode(data.token);
            if (decodeToken.user) {
                localStorage.setItem('user',JSON.stringify(decodeToken.user));
            }
            console.log("Réponse du serveur :", { status: reponse.status, data });
        }
        return {
            success:reponse.ok, //si true : 200 //false 400, 404,500
            message:data.message, //recuperation du message depuis le back
            data:data
        }

    }catch(err){
        // Si le serveur n'est pas activer
        return {
            success:false,
            message:'Impossible de se connecter au serveur.'
        }
    }
}





// Register
export const Registre = async(nom,prenom,cin,email,password) => {
    try {
        const reponse = await fetch(`${API_URL}/auth/Register`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({nom,prenom,cin,email,password}) //transformer les donnees js en jso
        });
        const data = await reponse.json(); //retransforme les donnees en objet js comme parse
        if (reponse.ok) {
            // Sauvegarde des identifiants dans la mémoire du navigateur
            if (data.token) {
                localStorage.setItem('token', data.token); //recuperation
            }
            // Decodage du token
            const decodeToken = jwtDecode(data.token);
            if (decodeToken.user) {
                localStorage.setItem('user', JSON.stringify(decodeToken.user));
                
            }
        }
        console.log("Réponse du serveur :", { status: reponse.status, data });
        return {
            success:reponse.ok, //si true : 200 //false 400, 404,500
            message:data.message|| "Inscription réussi", //recuperation du message depuis le back
            data:data
        }
    }catch(err){
        // Si le serveur n'est pas activer
        return {
            success:false,
            message:'Impossible de se connecter au serveur.'
        }
    }
}
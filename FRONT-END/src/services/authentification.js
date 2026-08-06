const API_URL = "http://localhost:3000";
export const login = async (email, password) =>{
    try {
        const reponse = await fetch(`${API_URL}/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({nom,email,password}) //transformer les donnees js en json

        });
        const data = await reponse.json(); //retransforme les donnees en objet js comme parse
        // !reponse.ok signifie : "Si le serveur nous renvoie un code d'erreur (HTTP 4xx ou 5xx)". =)false
        return {
            success:reponse.ok, //si true : 200 //false 400, 404,500
            message:data.message, //recuperation du message depuis le back
        }

    }catch(err){
        // Si le serveur n'est pas activer
        return {
            success:false,
            message:'Impossible de se connecter au serveur.'
        }
        
    }
}


// test //
// export const login = async (email, password) => {
//     try {
//         const response = await fetch('http://localhost:5000/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             return {
//                 success: true,
//                 message: data.message || "Connexion réussie !"
//             };
//         } else {
//             return {
//                 success: false,
//                 message: data.message || "Identifiants incorrects"
//             };
//         }
//     } catch (error) {
//         return {
//             success: false,
//             message: "Erreur de connexion au serveur"
//         };
//     }
// };



// Register
export const Registre = async(nom,email,password,second_pass) => {
    try {
        const reponse = await fetch(`${API_URL}/Register`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({nom,email,password}) //transformer les donnees js en jso
        });
        const data = await reponse.json(); //retransforme les donnees en objet js comme parse
        // !reponse.ok signifie : "Si le serveur nous renvoie un code d'erreur (HTTP 4xx ou 5xx)". =)false
        return {
            success:reponse.ok, //si true : 200 //false 400, 404,500
            message:data.message, //recuperation du message depuis le back
        }

    }catch(err){
        // Si le serveur n'est pas activer
        return {
            success:false,
            message:'Impossible de se connecter au serveur.'
        }
        
    }
}
// const API_URL = "http://localhost:3000";
// export const login = async (email, password) =>{
//     try {
//         const reponse = await fetch(`${API_URL}/login`,{
//             method:'POST',
//             headers:{'Content-Type':'application/json'},
//             body:JSON.stringify({email,password}) //transformer les donnees js en json

//         });
//         const data = await reponse.json(); //retransforme les donnees en objet js comme parse
//         // !reponse.ok signifie : "Si le serveur nous renvoie un code d'erreur (HTTP 4xx ou 5xx)". =)false
//         if (reponse.ok) {
//             // Sauvegarde des identifiants dans la mémoire du navigateur
//             if (data.token) {
//                 localStorage.setItem('token', data.token); //recuperation
//             }
//             if (data.user) {
//                 localStorage.setItem('user', JSON.stringify(data.user));
//             }
//         }
//         return {
//             success:reponse.ok, //si true : 200 //false 400, 404,500
//             message:data.message, //recuperation du message depuis le back
//             data:data
//         }

//     }catch(err){
//         // Si le serveur n'est pas activer
//         return {
//             success:false,
//             message:'Impossible de se connecter au serveur.'
//         }
//     }
// }


// Base de données fictive intégrée
const FAKE_USERS = [
  {
    id: 1,
    nom: "Fitiavana Jonathan",
    email: "admin@test.com",
    password: "1234",
    role: "superadmin"
  },
  {
    id: 2,
    nom: "Professeur Kevin",
    email: "prof@test.com",
    password: "1234",
    role: "enseignants"
  },
  {
    id: 3,
    nom: "Nathalia",
    email: "etudiant@test.com",
    password: "1234",
    role: "etudiants"
  }
];

export const login = async (email, password) => {
  try {
    // Simulation d'un délai réseau (500 ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Recherche dans nos faux utilisateurs
    const userFound = FAKE_USERS.find(
      (u) => u.email === email && u.password === password
    );

    // CAS 1 : Identifiants incorrects (Simulation HTTP 401)
    if (!userFound) {
      return {
        success: false,
        message: "Email ou mot de passe incorrect.",
        data: null
      };
    }

    // Création des données de réponse
    const data = {
      token: `fake-jwt-token-for-${userFound.role}`,
      user: {
        id: userFound.id,
        nom: userFound.nom,
        email: userFound.email,
        role: userFound.role
      },
      message: `Bienvenue, ${userFound.nom} !`
    };

    // Sauvegarde dans le localStorage (exactement comme ton code original)
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    // CAS 2 : Succès (Simulation HTTP 200)
    return {
      success: true,
      message: data.message,
      data: data
    };

  } catch (err) {
    return {
      success: false,
      message: "Impossible de se connecter au serveur."
    };
  }
};



// Register
// export const Registre = async(nom,email,password,second_pass) => {
//     try {
//         const reponse = await fetch(`${API_URL}/Register`,{
//             method:'POST',
//             headers:{'Content-Type':'application/json'},
//             body:JSON.stringify({nom,email,password}) //transformer les donnees js en jso
//         });
//         const data = await reponse.json(); //retransforme les donnees en objet js comme parse
//         if (reponse.ok) {
//             // Sauvegarde des identifiants dans la mémoire du navigateur
//             if (data.token) {
//                 localStorage.setItem('token', data.token); //recuperation
//             }
//             if (data.user) {
//                 localStorage.setItem('user', JSON.stringify(data.user));
//             }
//         }
//         return {
//             success:reponse.ok, //si true : 200 //false 400, 404,500
//             message:data.message, //recuperation du message depuis le back
//             data:data
//         }

//     }catch(err){
//         // Si le serveur n'est pas activer
//         return {
//             success:false,
//             message:'Impossible de se connecter au serveur.'
//         }
        
//     }
// }


// 2. Service d'Inscription (Registre)
export const Registre = async (nom, email, password) => {
    try {
        // Simulation d'un délai réseau (500 ms)
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Vérification si l'email existe déjà dans FAKE_USERS
        const userExists = FAKE_USERS.find((u) => u.email === email);
        if (userExists) {
            return {
                success: false,
                message: "Cet email est déjà utilisé.",
                data: null
            };
        }

        // Création du nouvel utilisateur (Rôle attribué par défaut : etudiants)
        const newUser = {
            id: FAKE_USERS.length + 1,
            nom: nom,
            email: email,
            password: password,
            role: "etudiants" // Tu peux changer par "enseignants" ou "superadmin" pour tester les autres redirections
        };

        // Ajout dans notre faux tableau
        FAKE_USERS.push(newUser);

        // Données de réponse identiques au Login
        const data = {
            token: `fake-jwt-token-for-${newUser.role}`,
            user: {
                id: newUser.id,
                nom: newUser.nom,
                email: newUser.email,
                role: newUser.role
            },
            message: "Inscription réussie !"
        };

        // Sauvegarde dans le localStorage
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return {
            success: true,
            message: data.message,
            data: data
        };

    } catch (err) {
        return {
            success: false,
            message: "Impossible de se connecter au serveur."
        };
    }
};
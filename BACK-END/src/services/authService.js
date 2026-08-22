// req http depuis l'api
const userModel = require('../models/userModel');
const connection = require('./../config/configdb');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async(nom,prenom,cin,email,password,role_id,formation_id,Date_creation) => {
    const Role_id = 4;
    return new Promise((resolve,reject)=> {
        // transaction
        connection.beginTransaction(async(err)=> {
            if (err) {
                return reject(err);
            }
            try {
                // hasher le mot de passe
                const hash = await bcrypt.hash(password,10);
        
                // role de l'etudiant durant l'inscription
                const user = 'etudiant';
                
                // si existant
                const newUser = await userModel.verification(email);
                if (newUser) {
                    throw new Error("Cette email est déja utilisé !");
                }
                else {
                    // debut de l'insertion

                    // insertion dans table user
                    const usertable = await userModel.insertUser(nom,prenom,cin,email,hash,Role_id);

                    // recup de l'id
                    const Etudiant_id = usertable.insertId;

                    // insertion dans table etudiants
                    await userModel.insertetutable(Etudiant_id,formation_id,Date_creation);
                    // generation de son JWT:
                    const token = jwt.sign(
                        {
                            email:email,
                            user:user,
                        },
                        process.env.JWT_SECRET, //recuperer la cle
                        {expiresIn:'1h'} //temps d'expiration
                    )
                    // Validation
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                reject(err);
                            })
                        }
                        resolve({
                            success:true,
                            message:"Inscription réussi !",
                            token:token,
                        })
                })
                }
                
            } catch(err) {
                // en cas d'erreur = annulation totale
                console.log(err);
                connection.rollback(() => {
                    reject(err);
                })
            }
        })
    })
}
exports.login = async(email,password) => {
    // comparaison du mot de passe
    const user = await userModel.readuser(email);

    // si user n'existe pas
    if (!user) {
        throw new Error("Utilisateur introuvable !"); //erreur metier
    }
    // compare bcrypt 
    const vrai_pass = await bcrypt.compare(password,user.password);
    if (!vrai_pass) {
        throw new Error("Mot de passe incorrect !") //erreur metier
    }
    // generation de son JWT:
    const token = jwt.sign(
        {
            email:user.email,
            user:user.nom_role
        },
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    )
    // il faut retourner les resultats:
    return {
        message: 'Connexion réussi!',
        token: token
    }
}
// req http depuis l'api
const userModel = require('../models/userModel');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async(nom,prenom,cin,email,password,role_id) => {
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
            await userModel.insertUser(nom,prenom,cin,email,hash,4);
        }

        // generation de son JWT:
        const token = jwt.sign(
            {
                email:email,
                user:user,
            },
            process.env.JWT_SECRET, //recuperer la cle
            {expiresIn:'1h'} //temps d'expiration
        )
        // il faut retourner les resultats:
    return {
        message: 'Connexion réussi!',
        token: token
    }
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
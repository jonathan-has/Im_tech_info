const service = require('./../services/authService');
exports.login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const result = await service.login(email,password);
        return res.status(200).json(result);
    }
    catch(err) {
        // precision de l'erreur
        if (err.message == 'Utilisateur introuvable !' || err.message == 'Mot de passe incorrect !'){
            return res.status(401).json({message:err.message}); 
        }
        return res.status(500).json(err); 
    }
}

exports.register = async(req,res)  => {
    try {
        const {nom,prenom,cin,email,password,role_id,formation_id,Date_creation} = req.body;
        const result = await service.register(nom,prenom,cin,email,password,role_id,formation_id,Date_creation);
        return res.status(201).json(result); //message status
    }catch(err) {
        // precision de l'erreur
        if (err.message == 'Mot de passe incorrect !' ||err.message == 'Cette email est déja utilisé !'){
            return res.status(401).json({message:err.message}); 
        }
        return res.status(500).json(err); 
    }
}

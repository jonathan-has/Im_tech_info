const dashService = require('./../services/dashService');

// FORMATIONS
exports.postFormations = async(req,res) => {
    try {
        const {titre,categorie,timer,description,date_creation} = req.body; //recuperation des données
        const result = await dashService.postFormations(titre,categorie,timer,description,date_creation);
        return res.status(200).json(result);
    }catch(err) {
        res.status(500).json(err);
    }
}

exports.getFormations = async(req,res) => {
    try {
        const result = await dashService.getFormations();
        return res.status(200).json(result);
    }catch(err) {
        res.status(500).json({message:err.message});
    }
} 

exports.deleteFormations = async(req,res) => {
    try {
        const id = req.params.id;
        const result = await dashService.deleteFormations(id);
        return res.status(200).json(result);
    }catch(err) {
        console.log(err);
        
        res.status(500).json({message:err.message});
    }
}

exports.putFormations = async(req,res) => {
    try {
        const id = req.params.id;
        const {titre, categorie,timer,description} = req.body;
        const result = await dashService.putFormations(id,titre, categorie,timer,description);
        return res.status(200).json(result);
    }catch(err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
}

// ENSEIGNANTS
exports.postens = async(req,res)  => {
    try {
        const {nom,prenom,formation_id,cin,email,password,date_creation} = req.body;
        const result = await dashService.postens(nom,prenom,formation_id,cin,email,password,date_creation);
        return res.status(200).json(result);
    } catch(err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }

} 

exports.getens = async(req,res) => {
    try {
        const resultat = await dashService.readens();
        return res.status(200).json(resultat);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.deleteens = async(req,res)=> {
    try {
        const Enseignant_id = req.params.id;
        const resultat = await dashService.deleteens(Enseignant_id);
        return res.status(200).json(resultat);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);        
    }
}


// ETUDIANTS
exports.getetudiant = async(req,res) => {
    try {
        const resultat = await dashService.getetudiant();
        return res.status(200).json(resultat)
    }catch(err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
}


exports.deletetudiant = async(req,res) => {
    try {
        const Etudiant_id = req.params.id
        const result = await dashService.deleteetudiant(Etudiant_id);
        res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}
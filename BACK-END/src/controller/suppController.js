const suppService = require('./../services/suppService');

exports.getsupp = async(req,res) => {
    try {
        const resultat = await suppService.readsupp();
        return res.status(200).json(resultat);
    }
    catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

exports.postsupp = async(req,res) => {
    try {
        const {Support_name,Date_creation,Enseignant_id,Formation_id} = req.body;
        let file_name = "";
        if (req.file) {
            file_name = req.file.filename; //pour le nom du fichier
        }
        else {
            throw new Error("Erreur lors de l'enregistrement du nom du fichier !");
        }
        const resultat = await suppService.insertsupp(Support_name,file_name,Date_creation,Enseignant_id,Formation_id);
        return res.status(200).json(resultat);
    }
    catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

exports.deletesupp = async(req,res) => {
    try {
        const id = req.params.id;
        const resultat = await suppService.deletesupp(id);
        return res.status(200).json(resultat);
    }
    catch(err) {
        console.log(err);
        
        return res.status(500).json(err);
    }
}

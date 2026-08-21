const dashModel = require('./../models/dashModel');
const connection = require('./../config/configdb'); 
const bcrypt = require('bcrypt');
// FORMATIONS
exports.postFormations = async(titre,categorie,timer,description,date_creation) => {
    const formations = await dashModel.insertFormation(titre,categorie,timer,description,date_creation);
    return {
        success:true,
        message: 'Formation crée avec succès !'
    }
}

exports.getFormations = async() => {
    const formations = await dashModel.readFormation();
    if (formations.length == 0) {
        throw new Error("Aucune formation n'est disponible !");
    }
    return formations;
}

exports.deleteFormations = async(id) => {
    const formations = await dashModel.deleteFormation(id);
    return {
        success:true,
        message:"La formation  a été bien supprimé"
    }
}

exports.putFormations = async(id,titre, categorie,timer,description) => {
    const formations = await dashModel.updateFormation(id,titre, categorie,timer,description);
    return {
        success:true,
        message:"La formation a été bien modifié"
    }
}

// ENSEIGNANTS
exports.postens = async(nom,prenom,formation_id,cin,email,password,date_creation)=> {
    const Role_id = 3;
    return new Promise((resolve,reject)=> {
        //transaction
        connection.beginTransaction(async(err) => {
            if (err) {
                return reject(err);
            }
            try {
                // hacher le mot de passe de l'user
                // const pass_hacher = bcrypt.hash(password,10);

                // Insertion dans table : user
                const userTable = await dashModel.insertens(nom,prenom,cin,email,password,Role_id);

                // Recuperation de l'id de l'enseignant depuis la reponse du userTable
                const Enseignant_id = userTable.insertId;

                // Insertion dans table : enseignant
                await dashModel.insertenseignanttable(Enseignant_id,formation_id,date_creation);

                // Validation 
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            reject(err);
                        })
                    }
                    resolve({
                        success:true,
                        message:"L'enseignant a été ajouté"
                    });
                })
            }catch(err) {
                // En cas d'erreur annulation totale du code
                console.log(err);
                
                connection.rollback(()=> {
                    reject(err);
                })
            }
        })
    })
}

exports.readens = async()=> {
        const enseignant = await dashModel.readens();
        if (enseignant.length === 0) {
            throw new Error("Aucune enseignant n'est encore ajouté");
        }
        return enseignant;
}

exports.deleteens = async(Enseignant_id) => {
    const enseignant = await dashModel.deleteenseignanttable(Enseignant_id);
    if (enseignant) {
        await dashModel.deleteens(Enseignant_id);
    }
    return {
        success:true,
        message:"L'enseignant a été bien supprimé !"
    }
}
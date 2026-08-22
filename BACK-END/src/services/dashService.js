const dashModel = require('./../models/dashModel');
const connection = require('./../config/configdb'); 
const bcrypt = require('bcrypt');
const transport = require('./../config/configmail');
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
                const mail = {
                    from:"fitiavanajonathanjunior@gmail.com",
                    to:`${email}`, // destinataire
                    subject:"ENVOI DU MAIL ET LE MOT DE PASSE",
                    html:`    <style>
                    .bouton_hover:hover {
                        transform: scale(1.02);
                    }
                    .bouton_hover:active {
                        transform: scale(0.9);
                    }
                </style>
                <div style="display:flex;margin:0;font-family:Arial, Helvetica, sans-serif;justify-content: center;align-items: center;">
                    <div style="width:98%;background-color: #f1f5f9;box-shadow: 0px 0px 10px 5px gray;max-width:420px;height:auto;border-radius: 5px;">
                        <div>
                            <h1 style="font-size: 1.2rem;text-align: center;color: rgb(19, 19, 179);font-weight: bolder;">IM TECH INFO</h1>
                            <p style="font-size: 0.8rem;color:rgb(133, 133, 133);text-align: center;">Plateforme de gestion de formations et supports</p>
                            <h3 style="font-size: 1rem;padding-left: 1rem;">Bonjour, </h3>
                            <p style="padding-left: 1rem;font-size: 0.8rem;color: rgb(45, 45, 45);">Voici vos identifiants temporaires pour accéder à votre espace :</p>
                        </div>
                        <div style="font-size:0.9rem;background-color: white; margin:2%;padding: 1%;border-radius:6px">
                            <h4 style="font-weight: bold;padding-left:1rem">Email:</h4>
                            <p style="color: rgb(45, 45, 45);padding-left:1rem">${email}</p>
                            <h4 style="font-weight: bold;padding-left:1rem">Mot de passe temporaire:</h4>
                            <p style="color: rgb(45, 45, 45);padding-left:1rem">${password}</p>
                        </div>
                        <div style="width: 100%;display:flex;align-items: center;justify-content: center;">
                            <button class="bouton_hover" style="transition:all 0.3s ease;cursor:pointer;background-color: rgb(19, 19, 179);outline:none;border:none;padding: 1rem;font-size:1rem;color:white;width:90%;text-align:center; border-radius:10px;">Se connecter à l'espace</button>
                        </div>
                        <p style="padding-left: 1rem;font-size: 0.8rem;color: rgb(45, 45, 45);text-align:center">Veuillez-vous connecter afin de modifier votre mot de passe</p>
                        </div>
                        </div>`
                    }
                // Envoye du message a l'enseignant
                    transport.sendMail(mail,(err,info)=> {
                        if (err) return console.log(err);
                        console.log("Email envoye au destinataire !");
                    })
                // hacher le mot de passe de l'user
                const pass_hacher = await bcrypt.hash(password,10);

                // Insertion dans table : user
                const userTable = await dashModel.insertens(nom,prenom,cin,email,pass_hacher,Role_id);

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
            console.log("Aucune enseignant n'est encore ajouté");
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


// ETUDIANTS
exports.getetudiant = async() => {
    const etudiants = await dashModel.readetudiant();
    if (etudiants.length == 0) {
    console.log("Aucune etudiant n'est inscrit !");
    }
    return etudiants;
}

exports.deleteetudiant = async (id) => {
    const etudianttable = await dashModel.deleteetudianttable(id);
    if (etudianttable){
        await dashModel.deleteetudiant(id);
    }
    else {
        throw new Error("Une erreur s'est produite !");
    }
    return {
        success:true,
        message: "L'étudiant a bien été supprimé !"
    }
}
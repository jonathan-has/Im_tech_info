const connection = require('./../config/configdb');

// POUR LES FORMATIONS
const insertFormation = (titre,categorie,timer,description,date_creation) => {
    return new Promise((resolve,reject) => {
        const req_sql = 'INSERT INTO formations(Titre,Categorie,Timer,Description,Date_creation) VALUES(?,?,?,?,?)';
        connection.query(req_sql,[titre,categorie,timer,description,date_creation],(err,result) =>{
            if (err) {
                return reject(err);
            }
            return resolve(result);
        } )
    })
}
const readFormation = () => {
    return new Promise((resolve,reject)=>{
        const req_sql = 'SELECT * FROM formations';
        connection.query(req_sql,(err,result) =>{
            if (err) {
                return reject(err);
            }
            // return resolve(result.length > 0);  //retourne des booleens
            return resolve(result);
        })
    })
}
const deleteFormation = (id) => {
    return new Promise((resolve,reject) =>{
        const req_sql = 'DELETE FROM formations WHERE ID=?';
        connection.query(req_sql,[id],(err,result) =>{
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}
const updateFormation = (id,titre, categorie,timer,description) => {
    return new Promise((resolve,reject)=> {
        const req_sql = 'UPDATE formations SET Titre=?, Categorie=?,Timer=?,Description=? WHERE ID=?'
        connection.query(req_sql,[titre, categorie,timer,description,id],(err,result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}



// POUR LES ENSEIGNANTS
const insertens = (NOM,Prenom,CIN,email,password,Role_id) => {
    return new Promise((resolve,reject) =>{
        const req_sql = 'INSERT INTO user(NOM,Prenom,CIN,email,password,Role_id) VALUES (?,?,?,?,?,?)';
        connection.query(req_sql,[NOM,Prenom,CIN,email,password,Role_id],(err,result) =>{
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

// servira les enseignants dans leurs tables
const insertenseignanttable = (Enseignant_id,Formation_id,date_creation) => {
    return new Promise((resolve,reject) => {
        const req_sql = 'INSERT INTO enseignants(Enseignant_id,Formation_id,date_creation) VALUES(?,?,?)';
        connection.query(req_sql,[Enseignant_id,Formation_id,date_creation],(err,result)=> {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        } )
    })
}

const readens = () => {
    return new Promise((resolve,reject) => {
        const req_sql = 'SELECT e.Enseignant_id,user.email,e.Formation_id,e.Date_creation ,formations.ID, formations.Titre,user.ID,user.NOM FROM enseignants e INNER JOIN user ON e.Enseignant_ID = user.ID INNER JOIN formations ON e.Formation_id = formations.ID';
        connection.query(req_sql,(err,result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

const deleteens = (Enseignant_id) => {
    return new Promise((resolve,reject)=> {
        const req_sql = 'DELETE FROM user WHERE ID=?';
        connection.query(req_sql,[Enseignant_id],(err,result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}
// enseignant table suppression
const deleteenseignanttable = (Enseignant_id) => {
    return new Promise ((resolve,reject) => {
        const req_sql = 'DELETE FROM enseignants WHERE Enseignant_id=?';
        connection.query(req_sql,[Enseignant_id],(err,result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

// ETUDIANTS
const readetudiant = () => {
    return new Promise((resolve,reject) =>{
        const req_sql = 'SELECT e.Etudiant_id, e.Formation_id,e.Date_creation,u.NOM,u.ID,formations.ID,formations.Titre,u.email,u.Prenom FROM etudiants e INNER JOIN user u ON e.Etudiant_id = u.ID INNER JOIN formations ON e.Formation_id = formations.ID';
        connection.query(req_sql,(err,result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}



// suppression dans user
const deleteetudiant =(id) => {
    return new Promise((resolve,reject) => {
        const req_sql = 'DELETE FROM user WHERE id=?';
        connection.query(req_sql,[id],(err,result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

const deleteetudianttable = (id) => {
    return new Promise((resolve,reject) => {
        const req_sql = 'DELETE FROM etudiants WHERE Etudiant_id=?';
        connection.query(req_sql,[id], (err,result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

// ETUDIANTS
module.exports = {
    // formations
    insertFormation,
    readFormation,
    deleteFormation,
    updateFormation,

    // enseignants
    insertens,
    insertenseignanttable,
    readens,
    deleteens,
    deleteenseignanttable,

    // etudiants
    readetudiant,
    deleteetudiant,
    deleteetudianttable
}
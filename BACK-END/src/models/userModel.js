const connection = require('./../config/configdb');

const verification = (email)=> {
    return new Promise((resolve,reject)=> {
        const first_sql = 'SELECT email FROM user WHERE email = ?';
        connection.query(first_sql,[email],(err,result) => {
        if (err) {
            return reject(err);
        }
        resolve(result.length>0);
        })   
    })
}

// inserer etudiant dans table user
const insertUser = (nom,prenom,cin,email, password,Role_id) => {
    return new Promise((resolve,reject) =>{

        const req_sql = 'INSERT INTO user(NOM,Prenom,CIN,email,password,Role_id) VALUES(?,?,?,?,?,?)';
        connection.query(req_sql,[nom,prenom,cin,email,password,Role_id],(err,result)=>{
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
}

// inserer etudiant dans table etudiant
const insertetutable = (Etudiant_id,Formation_id,Date_creation) => {
    return new Promise ((resolve,reject) => {
        const req_sql = "INSERT INTO etudiants(Etudiant_id,Formation_id,Date_creation) VALUES(?,?,?)";
        connection.query(req_sql,[Etudiant_id,Formation_id,Date_creation],(err,result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        } )
    })
}


const readuser = (email) => {
    return new Promise((resolve,reject) => {
        const req_sql = 'SELECT user.email,user.password, role.Nom_role AS nom_role FROM user INNER JOIN role ON user.Role_id = role.ID WHERE user.email = ?';
        connection.query(req_sql,[email],(err,result) => {
            if (err){
                reject(err);
            } 
            if (!result || result.length == 0) {
                return resolve(undefined)
            }
            resolve(result[0]);
        })
    });
}
module.exports= {
    verification,
    insertUser,
    readuser,
    insertetutable
}
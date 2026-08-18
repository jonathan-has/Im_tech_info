const connection = require('./../config/configdb');

const insertUser = (nom,prenom,cin,email, password) => {
    return new Promise((resolve,reject) =>{
        const req_sql = 'INSERT INTO user(NOM,Prenom,CIN,email,password,Role_id) VALUES(?,?,?,?,?,4)';
        connection.query(req_sql,[nom,prenom,cin,email,password],(err,result)=>{
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
}
module.exports= {insertUser}
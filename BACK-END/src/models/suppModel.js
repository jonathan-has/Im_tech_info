const connection = require('./../config/configdb');

const readsupport = ()  => {
    return new Promise((resolve,reject)=> {
        connection.query('SELECT * FROM supports',(err,result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

const insertsupport = (Support_name,file_name,Date_creation,Enseignant_id,Formation_id) => {
    return new Promise((resolve,reject) => {
        const req_sql = 'INSERT INTO supports(Support_name,file_name,Date_creation,Enseignant_id,Formation_id) VALUES(?,?,?,?,?)';
        connection.query(req_sql,[Support_name,file_name,Date_creation,Enseignant_id,Formation_id], (err,result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

const deletesupport = (id) => {
    return new Promise ((resolve,reject) => {
        const req_sql = 'DELETE FROM supports WHERE ID=?';
        connection.query(req_sql,[id],(err,result) => {
            if(err) {
                return reject(err);
            }
            return resolve(result);
        }) 
    })
}

module.exports = {
    readsupport,
    insertsupport,
    deletesupport
}
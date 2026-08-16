const data = require('mysql2');
const connection = data.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'im_tech_info'
    }
)
if (connection.connect) {
    console.log("MySQL is connect with Laragon !");
}
module.exports =connection;
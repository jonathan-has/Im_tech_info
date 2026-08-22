const multer = require('multer');

const stockage = multer.diskStorage({
    destination:(req,file,cb) => {
        // cb : callback
        cb(null,'public/file');//le lieu où on stocke les données
    },
    filename:(req,file,cb) => {
        // nom unique pour eviter les conflits
        const nomfichier = Date.now() +//il renvoi la date et l'erreur du moment
        '-' + file.originalname; // c'est le vrai nom du fichier donc === 12345-pandas.pdf
        cb(null,nomfichier);
    }
});
//  creation du middleware upload ou telecharger
const upload = multer({storage:stockage});

module.exports = upload;
const jwt = require('jsonwebtoken');
const authmiddleware = (req,res,next) => {
    try {
        // Recuperation du header   'Authorization': `Bearer ${token}`
        const authHeader = req.headers['authorization'];

        // Si au cas où il n'y a pas de header/token
        if(!authHeader) {
            return res.status(401).json({message:"Accès non accordé, token non prise en charge"});
        }

        // extraction du token
        const token = authHeader.split(' ')[1];

        // verification si token non expirer
        jwt.verify(token,process.env.JWT_SECRET,(err,decodedUser) =>{
            if (err) {
                return res.status(401).json({message: "Token non valide ou expirer"})
            }
            // stockage de l'information de l'user
            req.user = decodedUser;
            // si tout est ok :
            next();
        })

    }catch(err) {
        return res.status(500).json({message:err.message})
    }
}
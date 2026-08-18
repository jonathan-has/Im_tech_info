// req http depuis l'api
const userModel = require('../models/userModel');
const bcrypt= require('bcrypt');
exports.register = async(req,res) => {
    const {nom,prenom,cin,email, password} = req.body;
    try {
        const hash = await bcrypt.hash(password,10);
        await userModel.insertUser(nom,prenom,cin,email,hash)
        return res.status(201).json({message:"Inscription réussi!"}); //message status
    }catch(err){
        return res.status(500).json(err);
    }

}

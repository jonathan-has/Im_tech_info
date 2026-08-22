const suppModel = require("./../models/suppModel");

exports.readsupp = async () => {
    const supports = await suppModel.readsupport();
    if (supports.length == 0) {
        throw new Error("Aucune support n'est disponible !");
    }
    return supports;
}

exports.insertsupp = async (Support_name,file_name,Date_creation,Enseignant_id,Formation_id) => {
    const supports = await suppModel.insertsupport(Support_name,file_name,Date_creation,Enseignant_id,Formation_id);
    return {
        success:true,
        message: 'Support crée avec succès !'
    }
}

exports.deletesupp = async (id) => {
    const supports = await suppModel.deletesupport(id);
    return {
        success:true,
        message:'Support supprimé !'
    }
}
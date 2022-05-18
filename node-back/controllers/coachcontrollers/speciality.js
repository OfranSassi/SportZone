var Speciality = require("../../models/speciality");

//ajouter descipline
exports.createSpeciality = async (req, res) => {
    let speciality = new Speciality({
      label: req.body.label,
      links: req.body.links,
     
    });
    await speciality.save();
   
    return res.json({ speciality });
  };
  
var User = require("../../models/user"); 


exports.update_player= async(req,res)=>{
  User.updateOne({ _id: req.params.id },
        { $set: { 
          lastname: req.body.lastname ,
          firstname:req.body.firstname,
          weight:req.body.weight,
          length:req.body.length,
          establishment:req.body.type_establishment,
          function:req.body.function,
          laterility:req.body.laterility,
          birth_place:req.body.birth_place,
          imc:req.body.imc,
          DOB:req.body.dob,
          isactive:req.body.isactive
            

           }} ) 
       .then(() => { 
         res.status(201).json({
           message: "updated successfully!"
         });
       })
       .catch((error) => {
         res.status(400).json({
           error: error,
         });
       });
      };
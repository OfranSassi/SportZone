var User = require("../../models/user"); 
var bcrypt = require("bcrypt");

exports.update_profile= async(req,res)=>{
    //const user = await User.findById(req.userId); // haka tkbto
    bcrypt.hash(req.body.password, 10).then((hash) => {   
    //b params tkhdm ama b user connecté le 
     User.updateOne({ _id: req.userId },
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
             password:hash,
             DOB:req.body.dob,
             

            }} ) // succes yrj3li nfs objet 
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
    })};

    exports.profile = async (req, res) => {
        const player = await User.findById( req.userId );
        if (player){
          res.json({
            player
          })}
          else{
            res.status(404).json({
                success:false,
                message:"player not found"
            })
          }
        
        
      };

var Session = require("../../models/session"); 



//detail d'une seance
exports.showSession = async (req, res) => {
  Session.find({_id: req.params.id}, function (err, sess) {
    res.send(sess);
  });
};
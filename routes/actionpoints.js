exports.index = function(req, res){
  Models.actionpoints.find(function(err, actionpoints){
    res.json(actionpoints)
  }) 
};
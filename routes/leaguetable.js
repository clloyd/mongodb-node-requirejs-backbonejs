exports.index = function(req, res){
  Models.leaguetable.find(function(err, positions){
    res.json(positions)
  }) 
};
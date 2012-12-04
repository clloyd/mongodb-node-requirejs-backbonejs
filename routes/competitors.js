exports.index = function(req, res){
  Models.competitors.find().select('name lat lon _id').exec(function(err, competitors){
    res.json(competitors)
  }) 
};

exports.show = function(req, res){
  Models.competitors.findById(req.params.id, function(err, competitors){
    res.json(competitors)
  }) 
};
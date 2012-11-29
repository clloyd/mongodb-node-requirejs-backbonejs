exports.index = function(req, res){
  Models.latestreviews.find(function(err, reviews){
    res.json(reviews)
  }) 
};
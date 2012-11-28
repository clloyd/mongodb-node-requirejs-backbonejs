exports.index = function(req, res){
  Models.departments.find(function(err, departments){
    res.json(departments)
  }) 
};


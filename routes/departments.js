exports.index = function(req, res){

  var _ = require('underscore');

  Models.departments.find(function(err, departments){
    res.json(departments)
  }) 
};

exports.show = function(req, res){
  res.render('index', { title: 'Dashboard'});
};


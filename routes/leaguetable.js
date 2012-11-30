exports.index = function(req, res){
  Models.leaguetable.find(function(err, positions){
    res.json(positions)
  }) 
};

exports.trend = function(req, res){
  //Needs to end where Our Hotel currently is
  var async = require('async')

  Models.leaguetable.findOne({name: "Our Hotel"}, function (err, model){
    var values = []
    values.push(model.position)

    //Gotta do some async stuff (sorry node!) so each value is based on the last
    async.whilst(
      function () { return values.length < 12; },
      function (callback) {
        values.push(values[values.length-1] - (Math.floor(Math.random()*8) -4))
        callback()
      },
      function (err) {
        if (err) {console.log(err)}
        res.json(values.reverse())
      }
    );
  })
}
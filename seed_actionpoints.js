var mongoose = require('mongoose')
  , mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/DiveCP'
  , db = mongoose.createConnection(mongoUri)
  , _ = require('underscore')
  , colors = require('colors');

Models = {}
Schemas = {}

//Set up database

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database connection successful".green)

  //ACTIONPOINTS
  var actionpointSchema = new mongoose.Schema({
    text: String,
    icon: String,
    unread: Boolean
  })
  Models.actionpoints = db.model('Action Points', actionpointSchema)

  //Models.actionpoints.find(function(err, actionpoints){
  //  _.each(actionpoints, function(actionpoint){
  //    Models.actionpoints.findByIdAndRemove(actionpoint._id, function(){
  //      console.log("removing: " + actionpoint._id)
  //    })
  //  })
  //})

  var messages = [
    { text: "Increase in Complaints regarding Swimming Pool", icon: "alert", unread: true},
    { text: "Increase in Complaints regarding Check In", icon: "alert", unread: true},
    { text: "Increase in Complaints regarding Room Cleanliness", icon: "alert", unread: true},
    { text: "Decrease in Satisfaction from UK Visitors", icon: "world", unread: true},
    { text: "Increase in Complaints regarding Swimming Pool", icon: "minus", unread: false},
    { text: "Increase in Complaints regarding Noise Levels", icon: "minus", unread: false},
    { text: "Increase in Complaints regarding Staff", icon: "minus", unread: false}
  ]
  _.each(messages, function(actionpoint){
    var actionpoint = new Models.actionpoints(actionpoint);
    actionpoint.save(function (err, saveddept) {
      if (err) {
        console.log(("Error saving Actionpoint: " + err).red)
      } else {
        console.log("Added!")
      }
    });
  })

  console.log("Complete!")
});
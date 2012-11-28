var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'DiveCP')
  , _ = require('underscore');

Models = {}
Schemas = {}

//Set up database

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database connection successful".green)

  //Set Up Schemas
  Schemas.department = new mongoose.Schema({
    name: String,
    complaints: String
  })

  Models.departments = db.model('Departments', Schemas.department)

  departments = ["Housekeeping", "Location", "Facilities", "Quality", "Service", "Price"]
  
  _.each(departments, function(departmentname, index) {
    var department = new Models.departments({ name: departmentname, complaints: Math.floor(Math.random()*300)});
    
    department.save(function (err, saveddept) {
      if (err) {
        console.log(("Error saving Department: " + err).red)
      } else {
        console.log("Saved Department: " + departmentname)
      }
    });
  })
});
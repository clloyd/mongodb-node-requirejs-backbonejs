var mongoose = require('mongoose')
  , mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/DiveCP'
  , db = mongoose.createConnection(mongoUri)
  , _ = require('underscore')
  , colors = require('colors')
  , schemas = require('./db/schemas')
  , lipsum = require('lorem-ipsum')
  , moment = require('moment')
  , commander = require('commander');
Models = {}

//Seed Functions

function cleardb() {

  Object.keys(Models).forEach(function(modelkey){
    var model = Models[modelkey]
    model.find().remove(function(){
      console.log("removed")
    })
  })

  console.log("Completed remove step")
}

function seedactionpoints() {
  //Seed Action Points
  var messages = [
    { text: "Increase in Complaints regarding Swimming Pool", unread: true},
    { text: "Increase in Complaints regarding Check In", unread: true},
    { text: "Increase in Complaints regarding Room Cleanliness", unread: true},
    { text: "Decrease in Satisfaction from UK Visitors", unread: true},
    { text: "Increase in Complaints regarding Swimming Pool", unread: false},
    { text: "Increase in Complaints regarding Noise Levels", unread: false},
    { text: "Increase in Complaints regarding Staff", unread: false}
  ]
  _.each(messages, function(actionpoint){
    var actionpoint = new Models.actionpoints(actionpoint);
    actionpoint.save(function (err, saveddept) {
      if (err) {
        console.log(("Error saving Actionpoint: " + err).red)
      } else {
        console.log("Added ActionPoint!")
      }
    });
  })
}

function seeddepartments() {
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
}

function seedlatestreviews() {
  var locations = ['Singapore', 'Berwick upon Tweed', 'Newcastle', 'New York City', "San Fransisco", "Paris", "Dublin"]
  var countries = ['Singapore', 'USA', 'Thailand', 'Hong Kong', 'China', 'France', 'Germany','Ireland']
  var first_name = ['Dan', 'Chris', 'Jenny', 'Bernie', 'Graham', 'Shazina', 'Paula']
  var last_name = ['Marsh','Lloyd','Steele','Baskin','Easton','Zaini']
  for (var i = 10; i >= 0; i--) {
    
    var latestreview = new Models.latestreviews({
      review: lipsum({units: 'words', count: Math.floor(Math.random()*150)+50}),
      //Subtract a random amount of months and days
      date: new Date(moment().subtract('months', Math.floor(Math.random()*12)).subtract('days', Math.floor(Math.random()*31)).format()),
      user_name: first_name[Math.floor(Math.random()*(first_name.length - 1))] +" "+ last_name[Math.floor(Math.random()*(last_name.length - 1))] ,
      city: locations[Math.floor(Math.random()*(locations.length - 1))],
      country: countries[Math.floor(Math.random()*(countries.length - 1))],
      image: 'http://placekitten.com/100/100'
    })

    latestreview.save(function (err, review) {
      if (err) {
        console.log(("Error saving Review: " + err).red)
      } else {
        console.log("Saved Review")
      }
    });
  };
}

function seedleaguetable() {
  var positions = [
    {position: 1, name: "Hotel Grand", change: 1, score: 350},
    {position: 2, name: "Majestic Hotel", change: -1, score: 348},
    {position: 3, name: "Hotel Economy", change: 3, score: 330},
    {position: 4, name: "Big Brand Hotel", change: -1, score: 327},
    {position: 5, name: "Luxury Hotel", change: -1, score: 325},
    {position: 6, name: "Reflections Hotel", change: 0, score: 320},
    {position: 7, name: "The Boutique", change: 0, score: 311},
    {position: 8, name: "Hotel Grandieur", change: 1, score: 307},
    {position: 9, name: "The NXT Hotel", change: -1, score: 300},
    {position: 10, name: "Wonderlust Hotel", change: 2, score: 294},
    {position: 11, name: "Libre Hotel", change: -1, score: 280},
    {position: 12, name: "Value Hotel", change: -1, score: 276},
    {position: 13, name: "Our Hotel", change: 3, score: 269},
    {position: 14, name: "Station Hotel", change: 0, score: 261},
    {position: 15, name: "Aunties B&B", change: -1, score: 253},
    {position: 16, name: "Motel 81", change: -2, score: 245},
    {position: 17, name: "Hotel Expensive", change: 0, score: 237},
    {position: 18, name: "Rich Hotel", change: 1, score: 235},
    {position: 19, name: "Modern Hotel", change: -1, score: 234},
    {position: 20, name: "Hotel Acceptable", change: 0, score: 231}
  ]
  
  _.each(positions, function(position, index) {
    var positionrec = new Models.leaguetable(position);
    
    positionrec.save(function (err, saveddept) {
      if (err) {
        console.log(("Error saving Position: " + err).red)
      } else {
        console.log("Saved Postition: " + position.position)
      }
    });
  })
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  schemas.establish(db, function() {
    console.log("Database connection successful and setup".green)    
    if(commander.clean) {
      cleardb()
    } else if (commander.seed) {
      seedactionpoints()
      seeddepartments()
      seedlatestreviews()
      seedleaguetable()
      
    } else {
      console.log("No command specified... run with --help")
      process.exit()
    }
  })
});
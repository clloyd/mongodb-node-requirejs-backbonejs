exports.establish = function(db, callback){
  var mongoose = require('mongoose')
  var Models = {}
  //Set Up Schemas
  //DEPARTMENTS
  var departmentSchema = new mongoose.Schema({
    name: String,
    complaints: Number
  })
  Models.departments = db.model('Departments', departmentSchema)
  //ACTIONPOINTS
  var actionpointSchema = new mongoose.Schema({
    text: String,
    direction: String,
    amount: Number,
    unread: Boolean
  })
  Models.actionpoints = db.model('Action Points', actionpointSchema)
  //LATEST REVIEWS
  var latestReviewsSchema = new mongoose.Schema({
    review: String,
    date: Date,
    user_name: String,
    city: String,
    country: String,
    image: String
  })
  Models.latestreviews = db.model('Latest Reviews', latestReviewsSchema)
  //LATEST REVIEWS
  var leagueTableSchema = new mongoose.Schema({
    position: Number,
    name: String,
    change: Number,
    score: String
  })
  Models.leaguetable = db.model('League Table', leagueTableSchema)

  //Competitors
  var termSchema = new mongoose.Schema({
    term: String,
    score: Number
  })

  var CompetitorsSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lon: Number,
    phs_master_id: Number,
    terms: [termSchema]
  })
  Models.competitors = db.model('Competitors', CompetitorsSchema)


  callback(Models)

} 
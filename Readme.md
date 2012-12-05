Proof of Concept CP
===================

CP concept making use of Node.js, Require.js MongoDB and Mongoose on the backend, and on the frontend: Twitter Bootstrap, Backbone.js, Require.js


Current Server Setup
--------------------

Node.js backend connects to local MongoDB instance, using mongoose ODM.

Schemas and Models established on db connect.

If in production mode r.js complies all assets and copies to /public_build

Server is then started with read apis for each data source (TODO add write)


Current Client Setup
--------------------

Server renders jade template with menu structure in place.

main.js is called by require.js which just starts app.js (the actual app) with required dependancies.

The rest of the app is then structured around Backbone.js Views, Models and Collections, each initalted with router.js, which initiated in app.js.

Each menu tab has it's own Main view (index.js) and then each "widget" is a subview.

The UI is bootstrap based, pulling fonts from google web fonts.


Get started (Local)
-------------------

You'll need node, npm and a locally running mongodb instance.

Clone repo and run inside root

    npm install

Then to start the node server

    node app.js


You'll have a locally running copy, if you want to run on heroku, push to heroku as normal but you'll need a MongoDB provider, the system automatically checks for mongolab, so you can add that for free with

    heroku addons:add mongolab:starter

Ensure you set the enviroment to production with
    
    heroku config:add NODE_ENV=production

Will give you speedy assets :)

    
Folder Structure
----------------
    
    .
    |-- Procfile <-- The foreman procfile
    |-- Readme.md <-- This file
    |-- app.js <-- The server
    |-- db
    |   `-- schemas.js <-- Define the schemas
    |-- package.json
    |-- public
    |   |-- css
    |   |   |-- style.less  <-- Custom CSS here
    |   |   |-- vendor.less   <-- LESS file pulling in vendor files from subfolder
    |   |-- fonts <-- this is expecting the ss-standard icon font
    |   |-- img
    |   |-- js
    |       |-- app
    |       |   |-- collections <-- All the backbone collections (1 per "section")
    |       |   |-- models <-- All the backbone models (1 per "section")
    |       |   |-- router.js <-- The backbone router called by app.js
    |       |   `-- views <-- The backbone views
    |       |       |-- actionpoints <-- One folder per "page"
    |       |       |   |-- index.js  <-- the index.js is called by the router
    |       |       |   |-- table.js  <-- any backbone sub-views
    |       |       |   `-- templates  <-- All jade templates for that page
    |       |       |       |-- index.jade
    |       |       |       |-- table-row.jade
    |       |       |       |-- table.jade
    |       |       |       `-- widget.jade
    |       |       |-- departments
    |       |       |-- index
    |       |       |-- latestreviews
    |       |       `-- leaguetable
    |       |-- app.js <-- Get started and launch the router
    |       |-- libs  <-- The javascript libs
    |       |-- main.js <-- Launched by require/js initially, contains require.js settings and references app.js
    |       `-- require.js <-- require.js
    |-- routes  <-- The server side routing, only index returns html, others are for json API
    |   |-- actionpoints.js
    |   |-- departments.js
    |   |-- index.js
    |   |-- latestreviews.js
    |   `-- leaguetable.js
    |-- seed.js  <-- Useful script for seeding or cleaning the database
    `-- views
        `-- index.jade  <-- The one index serverside template
    










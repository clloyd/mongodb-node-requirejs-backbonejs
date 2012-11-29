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


Get started
-----------

Clone repo and run

    npm install

requires mongo db to be running locally.

Alternativly, deploy to heroku with a mongo Lab starter addon 

    heroku addons:add mongolab:starter

Ensure you set the enviroment to production with
    
    heroku config:add NODE_ENV=production

Will give you speedy assets :)









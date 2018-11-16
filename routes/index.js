var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB',{ useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var userSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Password: String
});

var User = mongoose.model('User', userSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

/* GET post user page. */
router.post('/user', function(req, res, next) {
    var newuser = new User(req.body); 
    console.log(newuser); 
    newuser.save(function(err, post) { 
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});

/* GET comments from database */
router.get('/user', function(req, res, next) {
    console.log("In the GET route?");
    User.find(function(err,commentList) { //Calls the find() method on your database
        if (err) return console.error(err); //If there's an error, print it out
        else {
        res.json(commentList); //Then send the comments
        }
    });
});

/* GET specific user info from database */
router.get('/user/:user', function(req, res, next) {
   var user = req.params.user;
   console.log(user);
   User.find({ Name : user }, function(err, userInfo) {
        if (err) return console.error(err); //If there's an error, print it out
        else {
        console.log("route " + userInfo);
            res.json(userInfo); //Then send the comments
        }
   }); 
});

/* DELETE users from database */
router.get('/delete', function(req, res, next) {
    User.deleteMany(function(err, status) {
       if (err) {
           return console.err(err);
       } else {
          console.log('success delete');
          console.log(status);
          res.sendStatus(200);
       }
    });
});

module.exports = router;

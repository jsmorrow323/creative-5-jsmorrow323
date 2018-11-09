var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB',{ useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

/* GET post comment page. */
router.post('/comment', function(req, res, next) {
    var newcomment = new Comment(req.body); 
    console.log(newcomment); 
    newcomment.save(function(err, post) { 
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});

/* GET comments from database */
router.get('/comment', function(req, res, next) {
    console.log("In the GET route?");
    Comment.find(function(err,commentList) { //Calls the find() method on your database
        if (err) return console.error(err); //If there's an error, print it out
        else {
        res.json(commentList); //Then send the comments
        }
    });
});

/* GET specific user comments from database */
router.get('/comment/:user', function(req, res, next) {
   var user = req.params.user;
   console.log(user);
   Comment.find({ Name : user }, function(err, commentList) {
        if (err) return console.error(err); //If there's an error, print it out
        else {
        res.json(commentList); //Then send the comments
        }
   }); 
});

/* DELETE comments from database */
router.get('/delete', function(req, res, next) {
    Comment.deleteMany(function(err, status) {
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

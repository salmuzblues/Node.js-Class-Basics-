var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var object_id = require('mongodb').ObjectID;
//
var assert = require('assert');// for testing values or variables
var url = 'mongodb://localhost:27017/test'; // test is database that we have
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/get-data', function (req,res,next) {
// getting data from database into the view
// connecting to database mongodb
MongoClient.connect(url,{useNewUrlParser: true}, function (err, client) {
  var resultArray= [];
  console.log('Successfully connected to server');
 assert.equal(null,err);
 var db  = client.db('test');
 // create a variable to store that data which pushes from mongodb
    var dataDb = db.collection('user-data').find();
 // then we are going to all the array dataDb.
 // create a variacle "doc" to store array
    dataDb.forEach(function (doc, err) {
    assert.equal(null, err);
 // we push doc into variable resultArray
    resultArray.push(doc);
 // create another function inside for this function for closing db
    }, function () {
        client.close();
 // here we are going through  index page then we push all data for variable items.
        res.render('index', { items: resultArray});
    });
});
});
router.post('/insert', function (req, res, next) {
// create a variable for catching values from /insert
    var item = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    };
    /* Working with Database  Mongodb  */
    //Connection
    MongoClient.connect(url,{useNewUrlParser: true}, function (err, client) {
     assert.equal(null, err); // this is for checking if we have some errors
      console.log("Successfully connected to server");
      var db  = client.db('test');
   // here we name user-data as a name of our collection.
   // inside the method insertOne we will create a function to call back
     db.collection('user-data').insertOne(item, function (err, result) {
      assert.equal(null, err); // if we do not have errors.
      console.log('Item Inserted');
      client.close();
     });
    });
    //redirect to home
    res.redirect('/')

});
router.post('/update', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    // retrieve id
    var id = req.body.id;
    /* Working with Database  Mongodb  */
    //Connection
    MongoClient.connect(url,{useNewUrlParser: true}, function (err, client) {
        assert.equal(null, err); // this is for checking if we have some errors
        console.log("Successfully connected to server");
        var db  = client.db('test');
        // here we name user-data as a name of our collection.
        // inside the method insertOne we will create a function to call back
        // _id what data is and $set: item show all data which is specified.
        db.collection('user-data').updateOne({"_id": object_id(id)},{$set: item}, function (err, result) {
            assert.equal(null, err); // if we do not have errors.
            console.log('Item updated');
            client.close();
        });
    });
    //redirect to home
    res.redirect('/')
});
router.post('/delete', function (req, res, next) {

    // retrieve id
    var id = req.body.id;
    /* Working with Database  Mongodb  */
    //Connection
    MongoClient.connect(url,{useNewUrlParser: true}, function (err, client) {
        assert.equal(null, err); // this is for checking if we have some errors
        console.log("Successfully connected to server");
        var db  = client.db('test');
        // here we name user-data as a name of our collection.
        // inside the method insertOne we will create a function to call back
        // _id what data is and $set: item show all data which is specified.
        db.collection('user-data').deleteOne({"_id": object_id(id)}, function (err, result) {
            assert.equal(null, err); // if we do not have errors.
            console.log('Item updated');
            client.close();
        });
    });
    //redirect to home
});
module.exports = router;

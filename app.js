var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('catalog', ['products']); //array of collections we want to work with

app.use(bodyParser.json()); //middleware

app.get('/', function(req, res){
  res.send("It appears to be working, sir!")
});

app.get('/products', function(req, res){
  console.log(" Products appears to be working, sir!");
  db.products.find(function(err, docs) {
      if(err) {
        res.send(err);
      }
      else {
        console.log("Sending Products Data...");
        res.json(docs);
      }
  });
});

app.get('/products/:id', function(req, res){
  console.log(" Products appears to be working, sir!");
  db.products.findOne({ _id:mongojs.ObjectId(req.params.id)}, function(err, doc) {
      if(err) {
        res.send("NO GOOD, BROSKI" + err);
      }
      else {
        console.log("Sending Product Data...");
        res.json(doc);
      }
  });
});

app.post('/products', function(req, res) {
    db.products.insert(req.body, function(err, doc){
      if(err) {
        res.send("NO GOOD, BROSKI" + err);
      }
      else {
        console.log("Adding Product Data...");
        res.json(doc);
      }
    });
});

app.put('/products/:id', function(req, res) {
    db.products.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)},
        update: {$set: {
          name: req.body.name,
          category: req.body.category,
          description: req.body.description
        }},
        new: true //if it doesn't find this particular product it does an insert
    }, function(err, doc){
      if(err) {
        res.send("NO GOOD, BROSKI" + err);
      }
      else {
        console.log("Updating Product Data...");
        res.json(doc);
      }
    });
});

app.delete('/products/:id', function(req, res){
  db.products.remove({ _id:mongojs.ObjectId(req.params.id)}, function(err, doc) {
      if(err) {
        res.send("NO GOOD, BROSKI" + err);
      }
      else {
        console.log("Removing Product Data...");
        res.json(doc);
      }
  });
});

app.listen(3000);
console.log('Server is running on port 3000, broski!')
